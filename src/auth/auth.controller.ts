import { Controller, Post, Body, UseGuards, Request, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RequestResetDto, ResetPasswordDto } from './dto/reset-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Email already exists');
      }
      throw error;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Post('request-reset-password')
  async requestResetPassword(@Body() requestResetDto: RequestResetDto) {
    const { success, message } = await this.authService.requestResetPassword(requestResetDto.email);
    if (!success) {
      throw new BadRequestException(message);
    }
    return { message };
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { success, message } = await this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
    if (!success) {
      throw new UnauthorizedException(message);
    }
    return { message };
  }
}