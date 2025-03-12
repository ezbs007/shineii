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
    // Find user and verify they are a bidder
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bidder'],
    });

    if (!user || user.user_type !== 2) {
      throw new UnauthorizedException('Only bidders can create bids');
    }

    if (!user.bidder) {
      throw new UnauthorizedException('Bidder profile not found');
    }

    // Find the job post
    const jobPost = await this.jobPostRepository.findOne({
      where: { id: createBidDto.jobPostId },
    });

    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }
    jobPost.status = 'bid_placed';
    await this.jobPostRepository.save(jobPost);

    // Create and save the bid
    const bid = this.bidRepository.create({
      job_post: jobPost,
      bidder: user.bidder[0],
      bid_amount: createBidDto.bid_amount,
      message: createBidDto.message,
      negosiation: true, // Default value as per requirement
    });
    console.log(user.bidder);
    console.log(bid.bidder);
    this.bidRepository.insert(bid)

    return bid;
  }
}