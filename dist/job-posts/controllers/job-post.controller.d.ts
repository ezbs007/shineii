import { JobPostService } from '../services/job-post.service';
export declare class JobPostController {
    private readonly jobPostService;
    constructor(jobPostService: JobPostService);
    getJobPostDetails(user: any, id: number): Promise<import("../interfaces/job-post.interface").IJobPostResponse>;
}
