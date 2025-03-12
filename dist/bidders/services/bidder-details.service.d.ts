import { Repository } from 'typeorm';
import { Bidder } from '../../entities/bidder.entity';
import { User } from '../../entities/user.entity';
import { BidderResponse } from '../interfaces/bidder-response.interface';
export declare class BidderDetailsService {
    private bidderRepository;
    private userRepository;
    constructor(bidderRepository: Repository<Bidder>, userRepository: Repository<User>);
    getBidderDetails(userId: number): Promise<BidderResponse>;
}
