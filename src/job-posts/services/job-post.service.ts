import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from '../../entities/job-post.entity';
import { IJobPostResponse } from '../interfaces/job-post.interface';
import { ErrorUtil } from '../../common/utils/error.util';
import { JobPostMapper } from '../mappers/job-post.mapper';

@Injectable()
export class JobPostService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
  ) {}

  async getJobPostDetails(userId: number, jobPostId: number): Promise<IJobPostResponse> {
    try {
      const jobPost = await this.jobPostRepository.findOne({
        where: { 
          id: jobPostId,
          auctioneer: { user: { id: userId } }
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
      return ErrorUtil.createErrorResponse(error);
    }
  }
}