import { Repository } from 'typeorm';
import { Bidder } from '../entities/bidder.entity';
import { User } from '../entities/user.entity';
import { CreateBidderDto } from './dto/create-bidder.dto';
import { UpdateBidderDto } from './dto/update-bidder.dto';
export declare class BiddersService {
    private bidderRepository;
    private userRepository;
    constructor(bidderRepository: Repository<Bidder>, userRepository: Repository<User>);
    create(userId: number, createBidderDto: CreateBidderDto): Promise<Bidder>;
    update(userId: number, updateBidderDto: UpdateBidderDto): Promise<Bidder>;
}
