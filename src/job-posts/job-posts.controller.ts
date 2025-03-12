import { Controller, Post, Get, Body, UseGuards, Request, Query } from '@nestjs/common';
import { JobPostsService } from './job-posts.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { FilterJobPostsDto } from './dto/filter-job-posts.dto';
import { PaginationQueryDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('job-posts')
@UseGuards(JwtAuthGuard)
export class JobPostsController {
  constructor(private readonly jobPostsService: JobPostsService) {}

  @Post()
  async createJobPost(@Request() req, @Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostsService.createJobPost(req.user.userId, createJobPostDto);
  }

  @Get('my-posts')
  async getMyJobPosts(@Request() req) {
    return this.jobPostsService.getJobPostsByAuctioneer(req.user.userId);
  }

  @Get('my-bids')
  async getMyBiddedPosts(@Request() req) {
    return this.jobPostsService.getJobPostsByBidder(req.user.userId);
  }

  @Get('nearby')
  async getNearbyJobPosts(@Request() req, @Query() filterDto: FilterJobPostsDto) {
    return this.jobPostsService.getJobPostsForBidder(req.user.userId, filterDto);
  }

  @Get()
  async getAllJobPosts(@Query() paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQuery;
    return this.jobPostsService.getAllJobPosts(page, limit);
  }
}