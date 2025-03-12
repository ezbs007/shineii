import { Controller, Post, Get, Body, UseGuards, Request, Param, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobFromBidDto } from './dto/create-job.dto';
import { CalendarJobsDto } from './dto/calendar-jobs.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('from-bid')
  async createFromBid(@Request() req, @Body() createJobFromBidDto: CreateJobFromBidDto) {
    return this.jobsService.createFromBid(req.user.userId, createJobFromBidDto.bidId);
  }

  @Get()
  async getAuctioneerJobs(@Request() req, @Query() pagination: PaginationDto) {
    return this.jobsService.getAuctioneerJobs(req.user.userId);
  }

  @Get('my-jobs')
  async getBidderJobs(@Request() req, @Query() pagination: PaginationDto) {
    return this.jobsService.getBidderJobs(req.user.userId);
  }



  @Get('calendar')
  async getCalendarJobs(
    @Request() req, 
    @Query() calendarJobsDto: CalendarJobsDto // This will now properly validate and transform the query parameters
  ) {
    return this.jobsService.getCalendarJobs(req.user.userId, calendarJobsDto);
  }

  @Get(':id')
  async getJobDetails(@Request() req, @Param('id') id: number) {
    return this.jobsService.getJobDetails(req.user.userId, id);
  }
}