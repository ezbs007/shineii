// import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, Between } from 'typeorm';
// import { Job } from '../entities/job.entity';
// import { Bid } from '../entities/bid.entity';
// import { User } from '../entities/user.entity';
// import { CalendarJobsDto } from './dto/calendar-jobs.dto';
// import { PaginationDto } from './dto/pagination.dto';
// import { IJobResponse, ICalendarJob } from './interfaces/job.interface';
// import { ErrorUtil } from '../common/utils/error.util';
// import { JobMapper } from './mappers/job.mapper';

// @Injectable()
// export class JobsService {
//   constructor(
//     @InjectRepository(Job)
//     private jobRepository: Repository<Job>,
//     @InjectRepository(Bid)
//     private bidRepository: Repository<Bid>,
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}

//   private async validateUser(userId: number, type: 'auctioneer' | 'bidder') {
//     const user = await this.userRepository.findOne({
//       where: { id: userId },
//       relations: ['auctioneer', 'bidder']
//     });

//     if (!user) {
//       throw new UnauthorizedException('User not found');
//     }

//     if (type === 'auctioneer' && !user.auctioneer) {
//       throw new UnauthorizedException('Only auctioneers can perform this action');
//     }

//     if (type === 'bidder' && !user.bidder) {
//       throw new UnauthorizedException('Only bidders can perform this action');
//     }

//     return user;
//   }

//   async createFromBid(userId: number, bidId: number): Promise<Job> {
//     const user = await this.validateUser(userId, 'auctioneer');

//     const bid = await this.bidRepository.findOne({
//       where: { id: bidId },
//       relations: [
//         'job_post',
//         'job_post.auctioneer',
//         'bidder'
//       ],
//     });

//     if (!bid) {
//       throw new NotFoundException('Bid not found');
//     }

//     if (bid.job_post.auctioneer.id !== user.auctioneer.id) {
//       throw new UnauthorizedException('You can only create jobs for your own job posts');
//     }

//     const existingJob = await this.jobRepository.findOne({
//       where: { bid: { id: bidId } }
//     });

//     if (existingJob) {
//       throw new ConflictException('This bid is already associated with a job');
//     }

//     const job = this.jobRepository.create({
//       job: `Boat ${bid.job_post.boatLength}ft`,
//       auctioneer: user.auctioneer,
//       bidder: bid.bidder,
//       payment_amount: bid.bid_amount,
//       payment_status: 'pending',
//       job_start_date: bid.job_post.job_start_date,
//       job_end_date: bid.job_post.job_end_date,
//       bid: bid
//     });

//     return this.jobRepository.save(job);
//   }

//   async getAuctioneerJobs(userId: number, pagination?: PaginationDto): Promise<IJobResponse> {
//     try {
//       const user = await this.validateUser(userId, 'auctioneer');

//       const [jobs, total] = await this.jobRepository.findAndCount({
//         where: { auctioneer: { id: user.auctioneer.id } },
//         relations: [
//           'bidder',
//           'bidder.user',
//           'bid',
//           'bid.job_post',
//           'reviews'
//         ],
//         order: { id: 'DESC' },
//         skip: pagination?.page ? (pagination.page - 1) * (pagination.limit || 10) : 0,
//         take: pagination?.limit || 10
//       });

//       return {
//         success: true,
//         message: 'Auctioneer jobs retrieved successfully',
//         data: jobs.map(job => JobMapper.toDTO(job)),
//         total,
//         page: pagination?.page || 1,
//         totalPages: Math.ceil(total / (pagination?.limit || 10))
//       };
//     } catch (error) {
//       return ErrorUtil.createErrorResponse(error);
//     }
//   }

//   async getBidderJobs(userId: number, pagination?: PaginationDto): Promise<IJobResponse> {
//     try {
//       const user = await this.validateUser(userId, 'bidder');

//       const [jobs, total] = await this.jobRepository.findAndCount({
//         where: { bidder: { id: user.bidder.id } },
//         relations: [
//           'auctioneer',
//           'auctioneer.user',
//           'bid',
//           'bid.job_post',
//           'reviews'
//         ],
//         order: { id: 'DESC' },
//         skip: pagination?.page ? (pagination.page - 1) * (pagination.limit || 10) : 0,
//         take: pagination?.limit || 10
//       });

//       return {
//         success: true,
//         message: 'Bidder jobs retrieved successfully',
//         data: jobs.map(job => JobMapper.toDTO(job)),
//         total,
//         page: pagination?.page || 1,
//         totalPages: Math.ceil(total / (pagination?.limit || 10))
//       };
//     } catch (error) {
//       return ErrorUtil.createErrorResponse(error);
//     }
//   }

//   async getJobDetails(userId: number, jobId: number): Promise<IJobResponse> {
//     try {
//       const user = await this.userRepository.findOne({
//         where: { id: userId },
//         relations: ['auctioneer', 'bidder']
//       });

//       const job = await this.jobRepository.findOne({
//         where: { id: jobId },
//         relations: [
//           'auctioneer',
//           'auctioneer.user',
//           'bidder',
//           'bidder.user',
//           'bid',
//           'bid.job_post',
//           'reviews'
//         ]
//       });

//       if (!job) {
//         throw new NotFoundException('Job not found');
//       }

//       if (user.auctioneer?.id !== job.auctioneer.id && user.bidder?.id !== job.bidder.id) {
//         throw new UnauthorizedException('You do not have permission to view this job');
//       }

//       return {
//         success: true,
//         message: 'Job details retrieved successfully',
//         data: JobMapper.toDTO(job)
//       };
//     } catch (error) {
//       return ErrorUtil.createErrorResponse(error);
//     }
//   }

//   async getCalendarJobs(userId: number, { month, year }: CalendarJobsDto): Promise<IJobResponse> {
//     try {
//       const user = await this.validateUser(userId, 'bidder');

//       const startDate = new Date(year, month - 1, 1);
//       const endDate = new Date(year, month, 0, 23, 59, 59);

//       const jobs = await this.jobRepository.find({
//         where: {
//           bidder: { id: user.bidder.id },
//           job_start_date: Between(startDate, endDate)
//         },
//         relations: [
//           'auctioneer',
//           'auctioneer.user',
//           'bid',
//           'bid.job_post'
//         ],
//         order: {
//           job_start_date: 'ASC'
//         }
//       });

//       const calendarJobs: ICalendarJob[] = jobs.map(job => JobMapper.toCalendarDTO(job));

//       return {
//         success: true,
//         message: 'Calendar jobs retrieved successfully',
//         data: calendarJobs
//       };
//     } catch (error) {
//       return ErrorUtil.createErrorResponse(error);
//     }
//   }
// }