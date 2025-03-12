import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Bidder } from '../entities/bidder.entity';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userRepository;
    private bidderRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, bidderRepository: Repository<Bidder>, jwtService: JwtService);
    private hashPassword;
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            first_name: any;
            last_name: any;
            user_type: any;
            has_bidder_profile: boolean;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        user_type: string;
        profile_pic: string;
        bidder: Bidder;
        auctioneer: import("../entities/auctioneer.entity").Auctioneer;
    }>;
    requestResetPassword(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
