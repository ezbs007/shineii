import { IsNotEmpty, IsNumber, IsString, IsArray, IsDateString, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @IsString()
  address: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  dockNumber: string;

  @IsString() 
  placeId: string;
}

export class CreateJobPostDto {
  @IsNotEmpty()
  @IsString()
  boatLength: string;

  @IsArray()
  @IsString({ each: true })
  additionalServices: string[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @IsNumber()
  dirtinessLevel:number;

  @IsOptional()
  @IsString()
  preferredDate?: string;

  @IsOptional()
  @IsNumber()
  max_bid_amount?: number;

  @IsOptional()
  @IsNumber()
  min_bid_amount?: number;

  @IsOptional()
  @IsDateString()
  bid_start_date?: Date;

  @IsOptional()
  @IsDateString()
  bid_end_date?: Date;

  @IsOptional()
  @IsDateString()
  job_start_date?: Date;

  @IsOptional()
  @IsDateString()
  job_end_date?: Date;

  @IsOptional()
  @IsString()
  boatName?: string; // Add this line
}