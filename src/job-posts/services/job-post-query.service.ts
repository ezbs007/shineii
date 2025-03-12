import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from '../../entities/job-post.entity';
import { Bidder } from '../../entities/bidder.entity';
import { FilterJobPostsDto } from '../dto/filter-job-posts.dto';
import { JobPostQueryBuilder } from './job-post-query.builder';

@Injectable()
export class JobPostQueryService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
  ) {}

  async getJobPostsForBidder(userId: number, filterDto: FilterJobPostsDto): Promise<JobPost[]> {
    const bidder = await this.bidderRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!bidder?.latitude || !bidder?.longitude) {
      throw new BadRequestException('Bidder location not set');
    }

    const radius = filterDto.radius || 7;
    let query = JobPostQueryBuilder.createBaseQuery(this.jobPostRepository);

    // Apply filters
    query = JobPostQueryBuilder.applyLocationFilter(query, bidder, radius);
    query = JobPostQueryBuilder.applyBoatLengthFilter(query, filterDto);

    if (filterDto.additionalServices) {
      const services = filterDto.additionalServices.split(',').map(s => s.trim());
      query = JobPostQueryBuilder.applyServicesFilter(query, services);
    }

    // Add distance-based ordering
    query = JobPostQueryBuilder.addDistanceOrdering(query, bidder);

    return query.getMany();
  }
}