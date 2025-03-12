export interface CustomerDashboardMetrics {
  totalCleaningRequestsPosted: number;
  pendingRequests: number;
  ongoingCleanings: number;
  completedCleanings: number;
  totalSpent: string;
  averageCleanerRating: number;
  bidsReceivedOnActiveRequests: number;
}

export interface SupplierDashboardMetrics {
  totalBidsPlaced: number;
  bidsWonAccepted: number;
  ongoingJobs: number;
  completedJobs: number;
  totalEarnings: string;
  averageRatingFromOwners: number;
  responseRateToRequests: string;
}

export interface DashboardResponse {
  success: boolean;
  data: CustomerDashboardMetrics | SupplierDashboardMetrics;
}