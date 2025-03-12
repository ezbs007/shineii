import { JobPostsService } from './job-posts.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { FilterJobPostsDto } from './dto/filter-job-posts.dto';
import { PaginationQueryDto } from './dto/pagination.dto';
export declare class JobPostsController {
    private readonly jobPostsService;
    constructor(jobPostsService: JobPostsService);
    createJobPost(req: any, createJobPostDto: CreateJobPostDto): Promise<import("../entities/job-post.entity").JobPost>;
    getMyJobPosts(req: any): Promise<import("../entities/job-post.entity").JobPost[]>;
    getMyBiddedPosts(req: any): Promise<import("../entities/job-post.entity").JobPost[]>;
    getNearbyJobPosts(req: any, filterDto: FilterJobPostsDto): Promise<import("../entities/job-post.entity").JobPost[]>;
    getAllJobPosts(paginationQuery: PaginationQueryDto): Promise<{
        data: import("../entities/job-post.entity").JobPost[];
        total: number;
        page: number;
        totalPages: number;
    }>;
}
