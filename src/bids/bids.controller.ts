import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bids')
@UseGuards(JwtAuthGuard)
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  async create(@Request() req, @Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(req.user.userId, createBidDto);
  }
}