import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiddersController } from './bidders.controller';
import { BiddersService } from './bidders.service';
import { Bidder } from '../entities/bidder.entity';
import { User } from '../entities/user.entity';
import { BidderUpdateService } from './services/bidder-update.service';
import { BidderDetailsService } from './services/bidder-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bidder, User])],
  controllers: [BiddersController],
  providers: [BiddersService, BidderUpdateService, BidderDetailsService],
})
export class BiddersModule {}