import { Repository } from 'typeorm';
import { JobPost } from '../../entities/job-post.entity';
import { Bidder } from '../../entities/bidder.entity';
import { FilterJobPostsDto } from '../dto/filter-job-posts.dto';
export declare class JobPostQueryService {
    private jobPostRepository;
    private bidderRepository;
    constructor(jobPostRepository: Repository<JobPost>, bidderRepository: Repository<Bidder>);
    getJobPostsForBidder(userId: number, filterDto: FilterJobPostsDto): Promise<JobPost[]>;
}
