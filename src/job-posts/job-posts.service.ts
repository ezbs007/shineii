import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Bidder } from '../entities/bidder.entity';
import { User } from '../entities/user.entity';
import { CreateJobPostDto } from './dto/create-job-post.dto';

@Injectable()
export class JobPostsService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createJobPost(userId: number, createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['auctioneer'],
    });

    if (!user || !user.auctioneer) {
      throw new UnauthorizedException('Only auctioneers can create job posts');
    }

    const jobPost = this.jobPostRepository.create({
      ...createJobPostDto,
      auctioneer: user.auctioneer,
      status: 'active' // Set initial status to active
    });

    return this.jobPostRepository.save(jobPost);
  }

  async getJobPostsByAuctioneer(userId: number): Promise<JobPost[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['auctioneer'],
    });

    if (!user || !user.auctioneer) {
      throw new UnauthorizedException('Only auctioneers can access this endpoint');
    }

    return this.jobPostRepository.find({
      where: { auctioneer: { id: user.auctioneer.id } },
      relations: ['auctioneer', 'bids', 'bids.bidder', 'bids.bidder.user'],
      order: { id: 'DESC' },
    });
  }

  async getJobPostsByBidder(userId: number): Promise<JobPost[]> {
    const bidder = await this.bidderRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!bidder) {
      throw new UnauthorizedException('Only bidders can access this endpoint');
    }

    return this.jobPostRepository
      .createQueryBuilder('jobPost')
      .leftJoinAndSelect('jobPost.auctioneer', 'auctioneer')
      .leftJoinAndSelect('auctioneer.user', 'auctioneerUser')
      .leftJoinAndSelect('jobPost.bids', 'bids')
      .leftJoinAndSelect('bids.bidder', 'bidder')
      .leftJoinAndSelect('bidder.user', 'bidderUser')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('bid', 'b')
          .where('b.job_post_id = jobPost.id')
          .andWhere('b.bidder_id = :bidderId')
          .getQuery();
        return 'EXISTS ' + subQuery;
      })
      .setParameter('bidderId', bidder.id)
      .orderBy('jobPost.id', 'DESC')
      .getMany();
  }

  async getJobPostsForBidder(userId: number, filterDto: any): Promise<JobPost[]> {
    const bidder = await this.bidderRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!bidder) {
      throw new UnauthorizedException('Only bidders can access this endpoint');
    }

    if (!bidder.latitude || !bidder.longitude) {
      throw new BadRequestException('Bidder location not set');
    }

    const radius = filterDto.radius || 7;

    let query = this.jobPostRepository
      .createQueryBuilder('jobPost')
      .leftJoinAndSelect('jobPost.auctioneer', 'auctioneer')
      .leftJoinAndSelect('jobPost.bids', 'bids')
      .leftJoinAndSelect('bids.bidder', 'bidder')
      .where('NOT EXISTS (SELECT 1 FROM bid WHERE bid.job_post_id = jobPost.id AND bid.bidder_id = :bidderId)', 
        { bidderId: bidder.id });

    query = query.andWhere(
      `(
        6371 * acos(
          cos(radians(:latitude)) * 
          cos(radians(ST_X(jobPost.location::geometry))) * 
          cos(radians(ST_Y(jobPost.location::geometry)) - radians(:longitude)) + 
          sin(radians(:latitude)) * 
          sin(radians(ST_X(jobPost.location::geometry)))
        )
      ) <= :radius`,
      {
        latitude: bidder.latitude,
        longitude: bidder.longitude,
        radius,
      }
    );

    if (filterDto.boatLengthFrom !== undefined) {
      query = query.andWhere('jobPost.boatLength >= :boatLengthFrom', {
        boatLengthFrom: filterDto.boatLengthFrom,
      });
    }

    if (filterDto.boatLengthTo !== undefined) {
      query = query.andWhere('jobPost.boatLength <= :boatLengthTo', {
        boatLengthTo: filterDto.boatLengthTo,
      });
    }

    if (filterDto.additionalServices) {
      const services = filterDto.additionalServices.split(',').map(s => s.trim());
      if (services.length > 0) {
        query = query.andWhere('jobPost.additionalServices @> :services', {
          services,
        });
      }
    }

    return query.getMany();
  }

  async getAllJobPosts(page: number, limit: number): Promise<{
    data: JobPost[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [data, total] = await this.jobPostRepository.findAndCount({
      relations: ['auctioneer', 'auctioneer.user', 'bids', 'bids.bidder'],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}