import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Job } from '../entities/job.entity';
import { Bid } from '../entities/bid.entity';
import { User } from '../entities/user.entity';
import { JobPost } from 'src/entities/job-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Bid, User, JobPost])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}