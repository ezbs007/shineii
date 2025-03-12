import { Repository } from 'typeorm';
import { JobPost } from '../../entities/job-post.entity';
import { IJobPostResponse } from '../interfaces/job-post.interface';
export declare class JobPostService {
    private jobPostRepository;
    constructor(jobPostRepository: Repository<JobPost>);
    getJobPostDetails(userId: number, jobPostId: number): Promise<IJobPostResponse>;
}
