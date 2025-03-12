import { Response } from 'express';
import { AdminService } from '../services/admin.service';
import { LoginDto } from '../dto/login.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getLogin(): {
        message: string;
    };
    postLogin(loginDto: LoginDto, res: Response): Promise<void>;
    getDashboard(): Promise<{
        stats: {
            users: number;
            auctioneers: number;
            bidders: number;
            jobPosts: number;
        };
    }>;
    logout(res: Response): Promise<void>;
    notFound(): void;
}
