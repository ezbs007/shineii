import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class AdminMiddleware implements NestMiddleware {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
