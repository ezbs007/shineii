import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Auctioneer } from '../entities/auctioneer.entity';
import { Bidder } from '../entities/bidder.entity';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { FilterJobPostsDto } from './dto/filter-job-posts.dto';
import { JobPostQueryService } from './job-post-query.service';
import { IJobPostResponse, IJobPost } from './interfaces/job-post.interface';
import { ErrorUtils } from 'src/utils/error.utils';
import { JobPostMapper } from './mapper/job-post.mapper';

@Injectable()
export class JobPostsService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
    @InjectRepository(Auctioneer)
    private auctioneerRepository: Repository<Auctioneer>,
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,

    private jobPostQueryService: JobPostQueryService,
  ) {}

  async createJobPost(userId: number, createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    const auctioneer = await this.auctioneerRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!auctioneer) {
      throw new UnauthorizedException('Only auctioneers can create job posts');
    }

    const jobPost = this.jobPostRepository.create({
      ...createJobPostDto,
      auctioneer,
      status: 'active'
    });

    return this.jobPostRepository.save(jobPost);
  }

  async getJobPostDetails(userId: number, jobPostId: number): Promise<IJobPostResponse> {
    try {
      const jobPost = await this.jobPostRepository.findOne({
        where: { 
          id: jobPostId
        },
        relations: [
          'auctioneer',
          'auctioneer.user',
          'bids',
          'bids.bidder',
          'bids.bidder.user'
        ],
      });

      if (!jobPost) {
        throw new NotFoundException('Job post not found');
      }

      const mappedJobPost = JobPostMapper.toDTO(jobPost, userId);

      return {
        success: true,
        message: 'Job post details retrieved successfully',
        data: mappedJobPost
      };
    } catch (error) {
      return ErrorUtils.createErrorResponse(error);
    }
  }

  async getJobPostsByAuctioneer(userId: number): Promise<JobPost[]> {
    const auctioneer = await this.auctioneerRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!auctioneer) {
      throw new NotFoundException('Auctioneer not found');
    }

    return this.jobPostRepository.find({
      where: { auctioneer: { id: auctioneer.id } },
      relations: ['auctioneer', 'auctioneer.user', 'bids'],
      order: {
        bid_end_date: 'DESC',
      },
    });
  }

  async getAllJobPosts(page: number = 1, limit: number = 10): Promise<{ data: JobPost[]; total: number; page: number; totalPages: number }> {
    const [jobPosts, total] = await this.jobPostRepository.findAndCount({
      relations: ['auctioneer', 'auctioneer.user', 'bids'],
      order: {
        bid_end_date: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: jobPosts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getJobPostsForBidder(userId: number, filterDto: FilterJobPostsDto): Promise<IJobPostResponse> {
    try {
    const bidder = await this.bidderRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!bidder || bidder.user.user_type !== 2) {
      throw new UnauthorizedException('Only bidders can access this endpoint');
    }

    const jobPosts = await this.jobPostQueryService.getJobPostsForBidder(userId, filterDto);
    const mappedJobPosts = jobPosts.map(post => JobPostMapper.toDTO(post, userId));
    // const mappedJobPosts: IJobPost[] = jobPosts.map(post => ({
    //   id: post.id,
    //   boatLength: Number(post.boatLength), // Convert string to number
    //   additionalServices: post.additionalServices,
    //   notes: post.notes,
    //   location: post.location,
    //   preferredDate: post.preferredDate,
    //   max_bid_amount: post.max_bid_amount,
    //   min_bid_amount: post.min_bid_amount,
    //   bid_start_date: post.bid_start_date,
    //   bid_end_date: post.bid_end_date,
    //   job_start_date: post.job_start_date,
    //   job_end_date: post.job_end_date,
    //   auctioneer: {
    //     id: post.auctioneer.id,
    //     company_name: post.auctioneer.company_name,
    //     user: {
    //       id: post.auctioneer.user.id,
    //       email: post.auctioneer.user.email,
    //       first_name: post.auctioneer.user.first_name,
    //       last_name: post.auctioneer.user.last_name
    //     },
    //   },
    //   bids: post.bids?.map(bid => ({
    //     id: bid.id,
    //     amount: bid.bid_amount,
    //     message: bid.message,
    //     bidder: `${bid.bidder.user.first_name} ${bid.bidder.user.last_name}`
    //   })) || []
    // }));

    return {
      success: true,
      message: 'Job posts retrieved successfully',
      data: mappedJobPosts,
    };
    } catch (error) {
      return ErrorUtils.createErrorResponse(error);
    }
  }


  async getJobPostsByBidder(userId: number): Promise<JobPost[]> {
    // First find the bidder
    const bidder = await this.bidderRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!bidder) {
      throw new UnauthorizedException('Only bidders can access this endpoint');
    }

    // Get job posts where the bidder has placed bids
    const jobPosts = await this.jobPostRepository
      .createQueryBuilder('jobpost')
      .leftJoinAndSelect('jobpost.auctioneer', 'auctioneer')
      .leftJoinAndSelect('auctioneer.user', 'auctioneerUser')
      .leftJoinAndSelect('jobpost.bids', 'bids')
      .leftJoinAndSelect('bids.bidder', 'bidder')
      .leftJoinAndSelect('bidder.user', 'bidderUser')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('bid', 'b')
          .where('b.jobPostId = jobPost.id')
          .andWhere('b.bidderId = :bidderId')
          .getQuery();
        return 'EXISTS ' + subQuery;
      })
      .setParameter('bidderId', bidder.id)
      .getMany();
  
    return jobPosts.map(jobPost => {
      const myBid = jobPost.bids.find(bid => bid.bidder.id === bidder.id);
      return {
        ...jobPost,
        my_bid_amount: myBid ? myBid.bid_amount : null
      };
    });

  }
}