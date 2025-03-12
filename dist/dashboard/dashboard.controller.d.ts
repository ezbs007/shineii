import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getCustomerDashboard(req: any): Promise<{
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
    getSupplierDashboard(req: any): Promise<{
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
}
