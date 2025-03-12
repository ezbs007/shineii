import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Job } from '../entities/job.entity';
import { Bid } from '../entities/bid.entity';
import { User } from '../entities/user.entity';
import { CalendarJobsDto } from './dto/calendar-jobs.dto';
import { IJobResponse, ICalendarJob } from './interfaces/job.interface';
import { ErrorUtils } from 'src/utils/error.utils';
import { JobPost } from 'src/entities/job-post.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>
  ) { }

  async createFromBid(userId: number, bidId: number): Promise<Job> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['auctioneer']
    });

    if (!user || !user.auctioneer) {
      throw new UnauthorizedException('Only auctioneers can create jobs');
    }

    const bid = await this.bidRepository.findOne({
      where: { id: bidId },
      relations: [
        'job_post',
        'job_post.auctioneer',
        'bidder',
        'bidder.user'
      ],
    });

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }
    if (bid.job_post.auctioneer.id !== user.auctioneer[0].id) {
      throw new UnauthorizedException('You can only create jobs for your own job posts');
    }

    const existingJob = await this.jobRepository.findOne({
      where: { bid: { id: bidId } }
    });

    if (existingJob) {
      throw new ConflictException('This bid is already associated with a job');
    }
    bid.job_post.status = 'bid_accepted';
    await this.jobPostRepository.save(bid.job_post);

    try {

      // Create new job entity

      const job = new Job();

      job.job = `Boat ${bid.job_post.boatLength}ft`;

      job.auctioneer = user.auctioneer[0];

      job.bidder = bid.bidder;

      job.payment_amount = bid.bid_amount;

      job.payment_status = 'pending';

      job.job_start_date = new Date(bid.job_post.preferredDate);

      job.job_end_date = bid.job_post.job_end_date;

      job.bid = bid;



      // Save the job using save() instead of create()

      return await this.jobRepository.save(job);

    } catch (error) {

      throw new Error(`Failed to create job: ${error.message}`);

    }

    // const job = this.jobRepository.create({
    //   job: `Boat ${bid.job_post.boatLength}ft`,
    //   auctioneer: user.auctioneer,
    //   bidder: bid.bidder,
    //   payment_amount: bid.bid_amount,
    //   payment_status: 'pending',
    //   job_start_date: bid.job_post.job_start_date,
    //   job_end_date: bid.job_post.job_end_date,
    //   bid: bid
    // });

    // // Save the job
    // const savedJob = await this.jobRepository.save(job);

    // // Return the saved job with relations
    // return this.jobRepository.findOne({
    //   where: { id: savedJob.id },
    //   relations: [
    //     'auctioneer',
    //     'auctioneer.user',
    //     'bidder',
    //     'bidder.user',
    //     'bid',
    //     'bid.job_post'
    //   ]
    // });
  }

  async getAuctioneerJobs(userId: number): Promise<Job[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['auctioneer']
    });

    if (!user || !user.auctioneer) {
      throw new UnauthorizedException('Only auctioneers can view jobs');
    }

    return this.jobRepository.find({
      where: { auctioneer: { id: user.auctioneer.id } },
      relations: [
        'bidder',
        'bidder.user',
        'bid',
        'bid.job_post',

      ],
      order: { id: 'DESC' }
    });
  }

  async getBidderJobs(userId: number): Promise<IJobResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['bidder']
      });

      if (!user || !user.bidder) {
        throw new UnauthorizedException('Only bidders can view their jobs');
      }

      const jobs = await this.jobRepository.find({
        where: { bidder: { id: user.bidder.id } },
        relations: [
          'auctioneer',
          'auctioneer.user',
          'bid',
          'bid.job_post'
        ],
        order: { id: 'DESC' }
      });

      return {
        success: true,
        message: 'Bidder jobs retrieved successfully',
        data: jobs
      };
    } catch (error) {
      return ErrorUtils.createErrorResponse(error);
    }
  }

  async getJobDetails(userId: number, jobId: number): Promise<IJobResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['auctioneer', 'bidder']
      });

      const job = await this.jobRepository.findOne({
        where: { id: jobId },
        relations: [
          'auctioneer',
          'auctioneer.user',
          'bidder',
          'bidder.user',
          'bid',
          'bid.job_post',

        ]
      });

      if (!job) {
        throw new NotFoundException('Job not found');
      }

      // Check if user is either the auctioneer or bidder of this job
      if (user.auctioneer?.id !== job.auctioneer.id && user.bidder?.id !== job.bidder.id) {
        throw new UnauthorizedException('You do not have permission to view this job');
      }

      return {
        success: true,
        message: 'Job details retrieved successfully',
        data: job
      };
    } catch (error) {
      return ErrorUtils.createErrorResponse(error);
    }
  }

  async getCalendarJobs(userId: number, { month, year }: CalendarJobsDto): Promise<IJobResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['bidder']
      });

      if (!user || !user.bidder) {
        throw new UnauthorizedException('Only bidders can view their calendar');
      }

      const startDate = new Date(Number(year), Number(month) - 1, 1);
      const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);

      const jobs = await this.jobRepository.find({
        where: {
          bidder: { id: user.bidder.id },
          job_start_date: Between(startDate, endDate)
        },
        relations: [
          'auctioneer',
          'auctioneer.user',
          'bid',
          'bid.job_post'
        ],
        order: {
          job_start_date: 'ASC'
        }
      });

      const calendarJobs: ICalendarJob[] = jobs.map(job => ({
        id: job.id,
        title: job.job,
        start: job.job_start_date,
        end: job.job_end_date,
        auctioneer: {
          company_name: job.auctioneer.company_name,
          contact_number: job.auctioneer.contact_number,
          user: {
            first_name: job.auctioneer.user.first_name,
            last_name: job.auctioneer.user.last_name
          }
        },
        job_details: {
          boat_length: job.bid.job_post.boatLength,
          additional_services: job.bid.job_post.additionalServices,
          notes: job.bid.job_post.notes
        },
        payment: {
          amount: job.payment_amount,
          status: job.payment_status
        }
      }));

      return {
        success: true,
        message: 'Calendar jobs retrieved successfully',
        data: calendarJobs
      };
    } catch (error) {
      return ErrorUtils.createErrorResponse(error);
    }
  }
}