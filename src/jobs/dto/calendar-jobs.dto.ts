import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class CalendarJobsDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(2023)
  year: number;
}