import { Repository } from 'typeorm';
import { Auctioneer } from '../../entities/auctioneer.entity';
import { User } from '../../entities/user.entity';
import { CreateAuctioneerDto } from '../dto/create-auctioneer.dto';
export declare class AuctioneerService {
    private auctioneerRepository;
    private userRepository;
    constructor(auctioneerRepository: Repository<Auctioneer>, userRepository: Repository<User>);
    private hashPassword;
    findAll(): Promise<Auctioneer[]>;
    findOne(id: number): Promise<Auctioneer>;
    create(createAuctioneerDto: CreateAuctioneerDto): Promise<Auctioneer>;
    update(id: number, updateAuctioneerDto: CreateAuctioneerDto): Promise<Auctioneer>;
    remove(id: number): Promise<Auctioneer>;
}
