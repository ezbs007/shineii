import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Auctioneer } from 'src/entities/auctioneer.entity';

@Injectable()
export class AuthService {
  private resetTokens: Map<string, { email: string; timestamp: number }> = new Map();

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auctioneer) 
    private auctioneerRepository: Repository<Auctioneer>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ 
      where: { email },
      relations: ['bidder']
    });
    console.log(user);
    if (user && await bcrypt.compare(password, user.password)) {
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
      service_range: user.service_range,
      has_bidder_profile: user.bidder && user.bidder.length > 0,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    if (registerDto.user_type === 1) {
      const auctioneer = this.auctioneerRepository.create({
        user: savedUser,
        company_name: null,
        contact_number: null,
        address: '',
      });
      await this.auctioneerRepository.save(auctioneer);
    }
    //  else if (registerDto.user_type === 2) {
    //   const bidder = this.bidderRepository.create({
    //     user: savedUser,
    //     title: '',
    //     bio_discription: '',
    //     contact_number: '',
    //     address: '',
    //   });.
    //   await this.bidderRepository.save(bidder);
    // }
    const { password, ...result } = savedUser;
    return result;
  }

  async requestResetPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Generate a reset token (in production, use a more secure method)
    const resetToken = Math.random().toString(36).substring(2, 15);
    this.resetTokens.set(resetToken, {
      email,
      timestamp: Date.now(),
    });

    // In a real application, send this token via email
    // For demo purposes, we'll just return it
    return {
      success: true,
      message: 'Password reset token generated',
      resetToken, // In production, don't send this in response
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const resetData = this.resetTokens.get(token);
    if (!resetData) {
      return { success: false, message: 'Invalid or expired reset token' };
    }

    // Check if token is expired (1 hour validity)
    if (Date.now() - resetData.timestamp > 3600000) {
      this.resetTokens.delete(token);
      return { success: false, message: 'Reset token has expired' };
    }

    const user = await this.userRepository.findOne({
      where: { email: resetData.email },
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);

    // Clean up used token
    this.resetTokens.delete(token);

    return { success: true, message: 'Password has been reset successfully' };
  }
}