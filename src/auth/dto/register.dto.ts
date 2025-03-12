import { IsEmail, IsNotEmpty, MinLength, IsString, IsNumber } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  user_type: number;

  @IsNumber()
  service_range: number = 7;
}