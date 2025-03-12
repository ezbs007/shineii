import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, Min, Max} from 'class-validator';

export class CalendarJobsDto {
  @IsNotEmpty()
  @Type(() => Number) // Add this to ensure proper type conversion from query string
  @IsNumber()
  @Min(1, { message: 'Month must be between 1 and 12' })
  @Max(12, { message: 'Month must be between 1 and 12' })
  month: number;

  @IsNotEmpty()
  @Type(() => Number) // Add this to ensure proper type conversion from query string
  @IsNumber()
  @Min(2023, { message: 'Year must be 2023 or later' })
  year: number;
}