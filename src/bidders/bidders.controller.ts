import { Controller, Post, Put, Body, UseGuards, Request } from '@nestjs/common';
import { BiddersService } from './bidders.service';
import { CreateBidderDto } from './dto/create-bidder.dto';
import { UpdateBidderDto } from './dto/update-bidder.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bidders')
@UseGuards(JwtAuthGuard)
export class BiddersController {
  constructor(private readonly biddersService: BiddersService) {}

  @Post()
  async create(@Request() req, @Body() createBidderDto: CreateBidderDto) {
    return this.biddersService.create(req.user.userId, createBidderDto);
  }

  @Put()
  async update(@Request() req, @Body() updateBidderDto: UpdateBidderDto) {
    return this.biddersService.update(req.user.userId, updateBidderDto);
  }
}