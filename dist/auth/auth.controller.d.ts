import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RequestResetDto, ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        user_type: string;
        profile_pic: string;
        bidder: import("../entities/bidder.entity").Bidder;
        auctioneer: import("../entities/auctioneer.entity").Auctioneer;
    }>;
    login(loginDto: LoginDto, req: any): Promise<{
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
    requestResetPassword(requestResetDto: RequestResetDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
