import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;
}