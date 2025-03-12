import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { Bid } from '../entities/bid.entity';
import { Bidder } from '../entities/bidder.entity';
import { JobPost } from '../entities/job-post.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bid, Bidder, JobPost, User])],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}