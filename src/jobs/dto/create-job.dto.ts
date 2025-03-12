import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJobFromBidDto {
  @IsNotEmpty()
  @IsNumber()
  bidId: number;
}