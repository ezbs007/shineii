import { User } from './user.entity';
import { Bid } from './bid.entity';
import { Job } from './job.entity';
export declare class Bidder {
    id: number;
    title: string;
    bio_discription: string;
    contact_number: string;
    address: string;
    latitude: number;
    longitude: number;
    user: User;
    bids: Bid[];
    jobs: Job[];
}
