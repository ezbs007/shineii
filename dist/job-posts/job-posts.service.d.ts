import { Repository } from 'typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Bidder } from '../entities/bidder.entity';
import { User } from '../entities/user.entity';
import { CreateJobPostDto } from './dto/create-job-post.dto';
export declare class JobPostsService {
    private jobPostRepository;
    private bidderRepository;
    private userRepository;
    constructor(jobPostRepository: Repository<JobPost>, bidderRepository: Repository<Bidder>, userRepository: Repository<User>);
    createJobPost(userId: number, createJobPostDto: CreateJobPostDto): Promise<JobPost>;
    getJobPostsByAuctioneer(userId: number): Promise<JobPost[]>;
    getJobPostsByBidder(userId: number): Promise<JobPost[]>;
    getJobPostsForBidder(userId: number, filterDto: any): Promise<JobPost[]>;
    getAllJobPosts(page: number, limit: number): Promise<{
        data: JobPost[];
        total: number;
        page: number;
        totalPages: number;
    }>;
}
