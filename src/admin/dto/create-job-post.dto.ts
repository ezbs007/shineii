import { IsNotEmpty, IsNumber, IsString, IsArray, IsDateString, IsOptional } from 'class-validator';

export class CreateJobPostDto {
  @IsNotEmpty()
  @IsNumber()
  boatLength: string;

  @IsArray()
  @IsString({ each: true })
  additionalServices: string[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  preferredDate?: string;

  @IsOptional()
  @IsNumber()
  max_bid_amount?: number;

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
}