import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RequestResetDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}