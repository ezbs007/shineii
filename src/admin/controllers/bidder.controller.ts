import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Render } from '@nestjs/common';
import { BidderAdminService } from '../services/bidder.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { CreateBidderDto } from '../dto/create-bidder.dto';
import { UpdateBidderDto } from '../dto/update-bidder.dto';

@Controller('admin/bidders')
@UseGuards(AdminAuthGuard)
export class BidderAdminController {
  constructor(private readonly bidderService: BidderAdminService) {}

  @Get()
  @Render('admin/bidder/list')
  async getAll() {
    const bidders = await this.bidderService.findAll();
    return { bidders };
  }

  @Get('new')
  @Render('admin/bidder/form')
  getCreateForm() {
    return { bidder: null };
  }

  @Post()
  async create(@Body() createBidderDto: CreateBidderDto) {
    return this.bidderService.create(createBidderDto);
  }

  @Get(':id')
  @Render('admin/bidder/form')
  async getOne(@Param('id') id: number) {
    const bidder = await this.bidderService.findOne(id);
    return { bidder };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBidderDto: UpdateBidderDto) {
    return this.bidderService.update(id, updateBidderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.bidderService.remove(id);
  }
}