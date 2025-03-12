import { Auctioneer } from './auctioneer.entity';
import { Bid } from './bid.entity';
export type JobPostStatus = 'active' | 'bid_placed' | 'newcomment' | 'bid_accepted' | 'cancelled';
export declare class JobPost {
    id: number;
    auctioneer: Auctioneer;
    boatLength: number;
    additionalServices: string[];
    notes: string;
    location: {
        address: string;
        latitude: number;
        longitude: number;
    };
    preferredDate: string;
    max_bid_amount: number;
    bid_start_date: Date;
    bid_end_date: Date;
    job_start_date: Date;
    job_end_date: Date;
    status: JobPostStatus;
    bids: Bid[];
}
