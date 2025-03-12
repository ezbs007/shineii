import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { JobPost } from '../../entities/job-post.entity';
import { FilterJobPostsDto } from '../dto/filter-job-posts.dto';
import { Bidder } from '../../entities/bidder.entity';

@Injectable()
export class JobPostQueryBuilder {
  static createBaseQuery(repository: Repository<JobPost>): SelectQueryBuilder<JobPost> {
    return repository
      .createQueryBuilder('job_post')
      .leftJoinAndSelect('job_post.auctioneer', 'auctioneer')
      .leftJoinAndSelect('auctioneer.user', 'user')
      .leftJoinAndSelect('job_post.bids', 'bids');
  }

  static applyLocationFilter(
    query: SelectQueryBuilder<JobPost>,
    bidder: Bidder,
    radius: number
  ): SelectQueryBuilder<JobPost> {
    return query.andWhere(
      `ST_DWithin(
        ST_SetSRID(ST_MakePoint(job_post.location->>'longitude', job_post.location->>'latitude')::geometry, 4326),
        ST_SetSRID(ST_MakePoint(:longitude, :latitude)::geometry, 4326),
        :distance
      )`,
      {
        latitude: bidder.latitude,
        longitude: bidder.longitude,
        distance: radius * 1000, // Convert km to meters
      }
    );
  }

  static applyBoatLengthFilter(
    query: SelectQueryBuilder<JobPost>,
    filterDto: FilterJobPostsDto
  ): SelectQueryBuilder<JobPost> {
    if (filterDto.boatLengthFrom !== undefined) {
      query.andWhere('job_post.boatLength >= :boatLengthFrom', {
        boatLengthFrom: filterDto.boatLengthFrom,
      });
    }

    if (filterDto.boatLengthTo !== undefined) {
      query.andWhere('job_post.boatLength <= :boatLengthTo', {
        boatLengthTo: filterDto.boatLengthTo,
      });
    }

    return query;
  }

  static applyServicesFilter(
    query: SelectQueryBuilder<JobPost>,
    services: string[]
  ): SelectQueryBuilder<JobPost> {
    if (services.length > 0) {
      return query.andWhere('job_post.additionalServices @> ARRAY[:...services]', {
        services,
      });
    }
    return query;
  }

  static addDistanceOrdering(
    query: SelectQueryBuilder<JobPost>,
    bidder: Bidder
  ): SelectQueryBuilder<JobPost> {
    return query.orderBy(
      `ST_Distance(
        ST_SetSRID(ST_MakePoint(job_post.location->>'longitude', job_post.location->>'latitude')::geometry, 4326),
        ST_SetSRID(ST_MakePoint(:longitude, :latitude)::geometry, 4326)
      )`,
      'ASC'
    );
  }
}