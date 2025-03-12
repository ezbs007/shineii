import { IsOptional, IsNumber, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterJobPostsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  radius?: number = 7; // Default radius is 7 km

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  boatLengthFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  boatLengthTo?: number;

  @IsOptional()
  @IsString()
  additionalServices?: string; // Comma-separated string of services
}