import { Controller, Post, Put, Get, Body, UseGuards } from '@nestjs/common';
import { BidderProfileService } from '../services/bidder-profile.service';
import { CreateBidderDto, UpdateBidderDto } from '../dto/bidder.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserTypeGuard } from '../../common/guards/user-type.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';

@Controller('bidders/profile')
@UseGuards(JwtAuthGuard, UserTypeGuard)
export class BidderProfileController {
  constructor(private readonly bidderProfileService: BidderProfileService) {}

  @Post()
  async create(@CurrentUser() user, @Body() createBidderDto: CreateBidderDto) {
    return this.bidderProfileService.create(user.userId, createBidderDto);
  }

  @Put()
  async update(@CurrentUser() user, @Body() updateBidderDto: UpdateBidderDto) {
    return this.bidderProfileService.update(user.userId, updateBidderDto);
  }

  @Get()
  async getDetails(@CurrentUser() user) {
    return this.bidderProfileService.getDetails(user.userId);
  }
}