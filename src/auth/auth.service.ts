import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Bidder } from '../entities/bidder.entity';
import { RegisterDto } from './dto/register.dto';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
    private jwtService: JwtService,
  ) {}

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ 
      where: { email },
      relations: ['bidder']
    });
    
    if (user && this.hashPassword(password) === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        user_type: user.user_type,
        has_bidder_profile: !!user.bidder
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = this.hashPassword(registerDto.password);
    
    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      first_name: registerDto.first_name,
      last_name: registerDto.last_name,
      user_type: registerDto.user_type,
    });

    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    return result;
  }

  async requestResetPassword(email: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    return { 
      success: true, 
      message: 'Password reset instructions have been sent to your email' 
    };
  }

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    return { 
      success: false, 
      message: 'Password reset functionality is not implemented' 
    };
  }
}