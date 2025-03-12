import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.cookies);
    const token = request.cookies['admin_token'];

    if (!token) {
      console.log("err");
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.user_type !== 0) {
        console.log("err");
        throw new UnauthorizedException();
      }

      request.user = user;
      return true;
    } catch {
      console.log("err");
      throw new UnauthorizedException();
    }
  }
}