import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JobPostService } from '../services/job-post.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';

@Controller('job-posts')
@UseGuards(JwtAuthGuard)
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  @Get(':id')
  async getJobPostDetails(@CurrentUser() user, @Param('id') id: number) {
    return this.jobPostService.getJobPostDetails(user.userId, id);
  }
}