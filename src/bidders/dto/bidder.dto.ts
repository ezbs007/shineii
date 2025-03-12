import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateBidderDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  bio_description?: string;

  @IsString()
  @IsOptional()
  contact_number?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsNumber()
  @IsOptional()
  @Min(-180)
  @Max(180)
  longitude?: number;
}

export class UpdateBidderDto extends CreateBidderDto {}