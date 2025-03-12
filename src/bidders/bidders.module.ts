import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidderProfileController } from './controllers/bidder-profile.controller';
import { BidderProfileService } from './services/bidder-profile.service';
import { Bidder } from '../entities/bidder.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bidder, User])],
  controllers: [BidderProfileController],
  providers: [BidderProfileService],
})
export class BiddersModule {}