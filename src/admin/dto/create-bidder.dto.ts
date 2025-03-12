import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateBidderDto {
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
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  bio_discription?: string;

  @IsString()
  @IsOptional()
  contact_number?: string;

  @IsString()
  @IsOptional()
  address?: string;
}