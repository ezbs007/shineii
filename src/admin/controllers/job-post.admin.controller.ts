import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Render } from '@nestjs/common';
import { JobPostAdminService } from '../services/job-post.admin.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { CreateJobPostDto } from '../dto/create-job-post.dto';
import { UpdateJobPostDto } from '../dto/update-job-post.dto';

console.log('JobPostAdminController');
@Controller('admin/jobposts')
@UseGuards(AdminAuthGuard)
export class JobPostAdminController {
  constructor(private readonly jobPostService: JobPostAdminService) {}


  @Get()
  @Render('admin/job-post/list')
  async getAll() {
    const jobPosts = await this.jobPostService.findAll();
    return { jobPosts };
  }

  @Get('new')
  @Render('admin/job-post/form')
  getCreateForm() {
    return { jobPost: null };
  }

  @Post()
  async create(@Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostService.create(createJobPostDto);
  }

  @Get(':id')
  @Render('admin/job-post/form')
  async getOne(@Param('id') id: number) {
    const jobPost = await this.jobPostService.findOne(id);
    return { jobPost };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateJobPostDto: UpdateJobPostDto) {
    return this.jobPostService.update(id, updateJobPostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.jobPostService.remove(id);
  }
}