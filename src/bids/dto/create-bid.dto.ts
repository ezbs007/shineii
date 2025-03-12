import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBidDto {
  @IsNumber()
  @IsNotEmpty()
  jobPostId: number;

  @IsNumber()
  @IsNotEmpty()
  bid_amount: number;

  @IsString()
  @IsOptional()
  message?: string;
}