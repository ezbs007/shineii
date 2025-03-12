import { Repository } from 'typeorm';
import { JobPost } from '../../entities/job-post.entity';
import { CreateJobPostDto } from '../dto/create-job-post.dto';
import { UpdateJobPostDto } from '../dto/update-job-post.dto';
export declare class JobPostAdminService {
    private jobPostRepository;
    constructor(jobPostRepository: Repository<JobPost>);
    findAll(): Promise<JobPost[]>;
    findOne(id: number): Promise<JobPost>;
    create(createJobPostDto: CreateJobPostDto): Promise<JobPost>;
    update(id: number, updateJobPostDto: UpdateJobPostDto): Promise<JobPost>;
    remove(id: number): Promise<JobPost>;
    count(): Promise<number>;
}
