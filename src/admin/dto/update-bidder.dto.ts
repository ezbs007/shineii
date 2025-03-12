import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateBidderDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

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