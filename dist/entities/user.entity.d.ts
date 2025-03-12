import { Bidder } from './bidder.entity';
import { Auctioneer } from './auctioneer.entity';
export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: string;
    profile_pic: string;
    bidder: Bidder;
    auctioneer: Auctioneer;
}
