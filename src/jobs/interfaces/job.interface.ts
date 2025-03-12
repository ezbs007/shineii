export interface IJob {
  id: number;
  job: string;
  payment_amount: number;
  payment_status: string;
  job_start_date: Date;
  job_end_date: Date;
  bidder: {
    id: number;
    title?: string;
    user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
  bid: {
    id: number;
    bid_amount: number;
    message?: string;
    job_post: {
      id: number;
      boatLength: string;
      additionalServices: string[];
      notes?: string;
    };
  };

}

export interface ICalendarJob {
  id: number;
  title: string;
  start: Date;
  end: Date;
  auctioneer: {
    company_name: string;
    contact_number: string;
    user: {
      first_name: string;
      last_name: string;
    }
  };
  job_details: {
    boat_length: string;
    additional_services: string[];
    notes?: string;
  };
  payment: {
    amount: number;
    status: string;
  };
}

export interface IJobResponse {
  success: boolean;
  message: string;
  data?: IJob | IJob[] | ICalendarJob[];
  error?: {
    code: string;
    details?: string;
  };
}