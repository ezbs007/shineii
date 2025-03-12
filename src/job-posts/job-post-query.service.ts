import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from 'src/entities/job-post.entity';
import { Bidder } from 'src/entities/bidder.entity';
import { FilterJobPostsDto } from './dto/filter-job-posts.dto';
import { LocationUtil } from 'src/utils/location.utils';

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
    const query = this.jobPostRepository
      .createQueryBuilder('jobpost')
      .leftJoinAndSelect('jobpost.auctioneer', 'auctioneer')
      .leftJoinAndSelect('auctioneer.user', 'user')
      .leftJoinAndSelect('jobpost.bids', 'bids')
      .leftJoinAndSelect('bids.bidder', 'bidder')
      .leftJoinAndSelect('bidder.user', 'bidderUser')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('bid', 'bid')
          .where('bid.jobPostId = jobPost.id')
          .andWhere('bid.bidderId = :bidderId')
          .getQuery();
        return `NOT EXISTS (${subQuery})`;
      })
      .setParameter('bidderId', bidder.id);

    // Apply location filter
    // if (bidder.latitude && bidder.longitude) {
    //   query.andWhere(
    //     `ST_DistanceSphere(
    //         ST_MakePoint(
    //             (jobpost.location->>'longitude')::float, 
    //             (jobpost.location->>'latitude')::float
    //         )::geometry,
    //         ST_MakePoint(:longitude, :latitude)::geometry
    //         ) <= :distance`,
    //     {
    //       latitude: bidder.latitude,
    //       longitude: bidder.longitude,
    //       distance: radius * 1000, // Convert km to meters
    //     }
    //   );
    // }

    // Apply boat length filter
    if (filterDto.boatLengthFrom !== undefined) {
      query.andWhere('jobpost.boatLength >= :boatLengthFrom', {
        boatLengthFrom: filterDto.boatLengthFrom,
      });
    }

    if (filterDto.boatLengthTo !== undefined) {
      query.andWhere('jobpost.boatLength <= :boatLengthTo', {
        boatLengthTo: filterDto.boatLengthTo,
      });
    }

    // Apply additional services filter
    if (filterDto.additionalServices) {
      const services = filterDto.additionalServices.split(',').map(s => s.trim());
      if (services.length > 0) {
        query.andWhere('jobpost.additionalServices @> :services', {
          services: JSON.stringify(services),
        });
      }
    }

    return query.getMany();
  }
}