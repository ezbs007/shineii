import { Repository } from 'typeorm';
import { Bidder } from '../../entities/bidder.entity';
import { User } from '../../entities/user.entity';
import { CreateBidderDto, UpdateBidderDto } from '../dto/bidder.dto';
import { IBidderResponse } from '../interfaces/bidder.interface';
export declare class BidderProfileService {
    private bidderRepository;
    private userRepository;
    constructor(bidderRepository: Repository<Bidder>, userRepository: Repository<User>);
    create(userId: number, createBidderDto: CreateBidderDto): Promise<IBidderResponse>;
    update(userId: number, updateBidderDto: UpdateBidderDto): Promise<IBidderResponse>;
    getDetails(userId: number): Promise<IBidderResponse>;
    private validateUser;
    private formatBidderResponse;
}
