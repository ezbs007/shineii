import { Repository, SelectQueryBuilder } from 'typeorm';
import { JobPost } from '../../entities/job-post.entity';
import { FilterJobPostsDto } from '../dto/filter-job-posts.dto';
import { Bidder } from '../../entities/bidder.entity';
export declare class JobPostQueryBuilder {
    static createBaseQuery(repository: Repository<JobPost>): SelectQueryBuilder<JobPost>;
    static applyLocationFilter(query: SelectQueryBuilder<JobPost>, bidder: Bidder, radius: number): SelectQueryBuilder<JobPost>;
    static applyBoatLengthFilter(query: SelectQueryBuilder<JobPost>, filterDto: FilterJobPostsDto): SelectQueryBuilder<JobPost>;
    static applyServicesFilter(query: SelectQueryBuilder<JobPost>, services: string[]): SelectQueryBuilder<JobPost>;
    static addDistanceOrdering(query: SelectQueryBuilder<JobPost>, bidder: Bidder): SelectQueryBuilder<JobPost>;
}
