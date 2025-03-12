import { Repository } from 'typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Job } from '../entities/job.entity';
import { Bid } from '../entities/bid.entity';
import { Review } from '../entities/review.entity';
import { User } from '../entities/user.entity';
export declare class DashboardService {
    private jobPostRepository;
    private jobRepository;
    private bidRepository;
    private reviewRepository;
    private userRepository;
    constructor(jobPostRepository: Repository<JobPost>, jobRepository: Repository<Job>, bidRepository: Repository<Bid>, reviewRepository: Repository<Review>, userRepository: Repository<User>);
    getCustomerMetrics(userId: number): Promise<{
        success: boolean;
        data: {
            totalCleaningRequestsPosted: number;
            pendingRequests: number;
            ongoingCleanings: number;
            completedCleanings: number;
            totalSpent: string;
            averageCleanerRating: number;
            bidsReceivedOnActiveRequests: number;
        };
    }>;
    getSupplierMetrics(userId: number): Promise<{
        success: boolean;
        data: {
            totalBidsPlaced: number;
            bidsWonAccepted: number;
            ongoingJobs: number;
            completedJobs: number;
            totalEarnings: string;
            averageRatingFromOwners: number;
            responseRateToRequests: string;
        };
    }>;
    private calculateResponseRate;
}
