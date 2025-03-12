import { Auctioneer } from './auctioneer.entity';
import { Bidder } from './bidder.entity';
import { Review } from './review.entity';
import { Bid } from './bid.entity';
import { Payment } from './payment.entity';
export declare class Job {
    id: number;
    job: string;
    auctioneer: Auctioneer;
    bidder: Bidder;
    job_start_date: Date;
    job_end_date: Date;
    payment_amount: number;
    payment_status: string;
    bid: Bid;
    reviews: Review[];
    payments: Payment[];
}
