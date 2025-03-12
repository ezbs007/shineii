import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';
import { Bid } from '../entities/bid.entity';
import { User } from '../entities/user.entity';
import { JobPost } from '../entities/job-post.entity';
import { CalendarJobsDto } from './dto/calendar-jobs.dto';
import { PaginationDto } from './dto/pagination.dto';
import { IJobResponse } from './interfaces/job.interface';
export declare class JobsService {
    private jobRepository;
    private bidRepository;
    private userRepository;
    private jobPostRepository;
    constructor(jobRepository: Repository<Job>, bidRepository: Repository<Bid>, userRepository: Repository<User>, jobPostRepository: Repository<JobPost>);
    private validateUser;
    createFromBid(userId: number, bidId: number): Promise<Job>;
    getAuctioneerJobs(userId: number, pagination?: PaginationDto): Promise<IJobResponse>;
    getBidderJobs(userId: number, pagination?: PaginationDto): Promise<IJobResponse>;
    getJobDetails(userId: number, jobId: number): Promise<IJobResponse>;
    getCalendarJobs(userId: number, { month, year }: CalendarJobsDto): Promise<IJobResponse>;
}
