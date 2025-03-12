import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuctioneerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  contact_number: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}