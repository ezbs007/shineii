import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from '../entities/bid.entity';
import { Bidder } from '../entities/bidder.entity';
import { JobPost } from '../entities/job-post.entity';
import { User } from '../entities/user.entity';
import { CreateBidDto } from './dto/create-bid.dto';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, createBidDto: CreateBidDto): Promise<Bid> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bidder'],
    });

    if (!user || user.user_type !== 'bidder') {
      throw new UnauthorizedException('Only bidders can create bids');
    }

    if (!user.bidder) {
      throw new UnauthorizedException('Bidder profile not found');
    }

    const jobPost = await this.jobPostRepository.findOne({
      where: { id: createBidDto.jobPostId },
    });

    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }

    // Update job post status to bid_placed
    jobPost.status = 'bid_placed';
    await this.jobPostRepository.save(jobPost);

    const bid = this.bidRepository.create({
      job_post: jobPost,
      bidder: user.bidder,
      bid_amount: createBidDto.bid_amount,
      message: createBidDto.message,
      negosiation: true,
    });

    return this.bidRepository.save(bid);
  }
}