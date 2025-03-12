import { Repository } from 'typeorm';
import { Bid } from '../entities/bid.entity';
import { Bidder } from '../entities/bidder.entity';
import { JobPost } from '../entities/job-post.entity';
import { User } from '../entities/user.entity';
import { CreateBidDto } from './dto/create-bid.dto';
export declare class BidsService {
    private bidRepository;
    private bidderRepository;
    private jobPostRepository;
    private userRepository;
    constructor(bidRepository: Repository<Bid>, bidderRepository: Repository<Bidder>, jobPostRepository: Repository<JobPost>, userRepository: Repository<User>);
    create(userId: number, createBidDto: CreateBidDto): Promise<Bid>;
}
