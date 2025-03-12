import { Controller, Post, Put, Get, Body, UseGuards, Request } from '@nestjs/common';
import { BiddersService } from './bidders.service';
import { BidderUpdateService } from './services/bidder-update.service';
import { BidderDetailsService } from './services/bidder-details.service';
import { CreateBidderDto } from './dto/create-bidder.dto';
import { UpdateBidderDto } from './dto/update-bidder.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('bidders')
@UseGuards(JwtAuthGuard)
export class BiddersController {
  constructor(
    private readonly biddersService: BiddersService,
    private readonly bidderUpdateService: BidderUpdateService,
    private readonly bidderDetailsService: BidderDetailsService,
  ) {}

  @Post()
  async create(@Request() req, @Body() createBidderDto: CreateBidderDto) {
    return this.biddersService.create(req.user.userId, createBidderDto);
  }

  @Put()
  async update(@Request() req, @Body() updateBidderDto: UpdateBidderDto) {
    console.log("in update")
    return this.bidderUpdateService.update(req.user.userId, updateBidderDto);
  }

  @Get()
  async getDetails(@Request() req) {
    return this.bidderDetailsService.getBidderDetails(req.user.userId);
  }
}