import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateBidderDto {
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

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;
}