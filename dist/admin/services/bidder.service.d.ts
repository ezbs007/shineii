import { Repository } from 'typeorm';
import { Bidder } from '../../entities/bidder.entity';
import { User } from '../../entities/user.entity';
import { CreateBidderDto } from '../dto/create-bidder.dto';
import { UpdateBidderDto } from '../dto/update-bidder.dto';
export declare class BidderAdminService {
    private bidderRepository;
    private userRepository;
    constructor(bidderRepository: Repository<Bidder>, userRepository: Repository<User>);
    private hashPassword;
    findAll(): Promise<Bidder[]>;
    findOne(id: number): Promise<Bidder>;
    create(createBidderDto: CreateBidderDto): Promise<Bidder>;
    update(id: number, updateBidderDto: UpdateBidderDto): Promise<Bidder>;
    remove(id: number): Promise<Bidder>;
    count(): Promise<number>;
}
