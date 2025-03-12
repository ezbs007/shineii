import { User } from './user.entity';
import { JobPost } from './job-post.entity';
import { Job } from './job.entity';
export declare class Auctioneer {
    id: number;
    company_name: string;
    contact_number: string;
    address: string;
    user: User;
    jobPosts: JobPost[];
    jobs: Job[];
}
