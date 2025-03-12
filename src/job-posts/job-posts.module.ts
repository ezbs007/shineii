import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Bidder } from '../entities/bidder.entity';
import { User } from '../entities/user.entity';
import { JobPostController } from './controllers/job-post.controller';
import { JobPostService } from './services/job-post.service';
import { JobPostQueryService } from './services/job-post-query.service';
import { JobPostQueryBuilder } from './services/job-post-query.builder';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost, Bidder, User])],
  controllers: [JobPostController],
  providers: [JobPostService, JobPostQueryService, JobPostQueryBuilder],
})
export class JobPostsModule {}