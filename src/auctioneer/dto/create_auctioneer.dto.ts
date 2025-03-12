import { IsEmail, IsNotEmpty, MinLength, IsString, IsNumber } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

}