import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { JobPost } from '../entities/job-post.entity';
import { Job } from '../entities/job.entity';
import { Bid } from '../entities/bid.entity';
import { Review } from '../entities/review.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobPost, Job, Bid, Review, User])
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}