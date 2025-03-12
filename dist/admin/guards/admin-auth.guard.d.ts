import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class AdminAuthGuard implements CanActivate {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
