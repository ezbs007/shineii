import { JobPostAdminService } from '../services/job-post.admin.service';
import { CreateJobPostDto } from '../dto/create-job-post.dto';
import { UpdateJobPostDto } from '../dto/update-job-post.dto';
export declare class JobPostAdminController {
    private readonly jobPostService;
    constructor(jobPostService: JobPostAdminService);
    getAll(): Promise<{
        jobPosts: import("../../entities/job-post.entity").JobPost[];
    }>;
    getCreateForm(): {
        jobPost: any;
    };
    create(createJobPostDto: CreateJobPostDto): Promise<import("../../entities/job-post.entity").JobPost>;
    getOne(id: number): Promise<{
        jobPost: import("../../entities/job-post.entity").JobPost;
    }>;
    update(id: number, updateJobPostDto: UpdateJobPostDto): Promise<import("../../entities/job-post.entity").JobPost>;
    remove(id: number): Promise<import("../../entities/job-post.entity").JobPost>;
}
