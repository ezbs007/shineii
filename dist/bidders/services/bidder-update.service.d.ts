import { Repository } from 'typeorm';
import { Bidder } from '../../entities/bidder.entity';
import { User } from '../../entities/user.entity';
import { UpdateBidderDto } from '../dto/update-bidder.dto';
import { BidderResponse } from '../interfaces/bidder-response.interface';
export declare class BidderUpdateService {
    private bidderRepository;
    private userRepository;
    constructor(bidderRepository: Repository<Bidder>, userRepository: Repository<User>);
    update(userId: number, updateBidderDto: UpdateBidderDto): Promise<BidderResponse>;
    private validateUserAndPermissions;
    private updateBidderProfile;
    private getErrorCode;
}
