export interface ILocation {
  address: string;
  latitude: number;
  longitude: number;
}

export interface IBidSummary {
  id: number;
  amount: number;
  message?: string;
  bidder: string;
}

export interface IJobPost {
  id: number;
  boatLength: number;
  boatName: string;
  additionalServices: string[];
  notes?: string;
  location?: ILocation;
  preferredDate?: string;
  max_bid_amount?: number;
  min_bid_amount?: number;
  bid_start_date?: Date;
  bid_end_date?: Date;
  job_start_date?: Date;
  job_end_date?: Date;
  auctioneer: {
    id: number;
    company_name: string;
    user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
  bids: IBidSummary[];
  mybid: IBidSummary;
}

export interface IJobPostResponse {
  success: boolean;
  message: string;
  data?: IJobPost | IJobPost[];
  total?: number;
  page?: number;
  totalPages?: number;
}