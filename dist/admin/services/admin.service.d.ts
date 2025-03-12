import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { Auctioneer } from '../../entities/auctioneer.entity';
import { Bidder } from '../../entities/bidder.entity';
import { JobPost } from '../../entities/job-post.entity';
import { LoginDto } from '../dto/login.dto';
export declare class AdminService {
    private userRepository;
    private auctioneerRepository;
    private bidderRepository;
    private jobPostRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, auctioneerRepository: Repository<Auctioneer>, bidderRepository: Repository<Bidder>, jobPostRepository: Repository<JobPost>, jwtService: JwtService);
    private hashPassword;
    validateAdmin(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    getDashboardStats(): Promise<{
        users: number;
        auctioneers: number;
        bidders: number;
        jobPosts: number;
    }>;
}
