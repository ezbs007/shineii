import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Render } from '@nestjs/common';
import { AuctioneerService } from '../services/auctioneer.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { CreateAuctioneerDto } from '../dto/create-auctioneer.dto';

@Controller('admin/auctioneer')
@UseGuards(AdminAuthGuard)
export class AuctioneerController {
  constructor(private readonly auctioneerService: AuctioneerService) {}

  @Get()
  @Render('admin/auctioneer/list')
  async getAll() {
    const auctioneers = await this.auctioneerService.findAll();
    return { auctioneers };
  }

  @Get('new')
  @Render('admin/auctioneer/form')
  getCreateForm() {
    return { auctioneer: null };
  }

  @Post()
  async create(@Body() createAuctioneerDto: CreateAuctioneerDto) {
    return this.auctioneerService.create(createAuctioneerDto);
  }

  @Get(':id')
  @Render('admin/auctioneer/form')
  async getOne(@Param('id') id: number) {
    const auctioneer = await this.auctioneerService.findOne(id);
    return { auctioneer };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAuctioneerDto: CreateAuctioneerDto) {
    return this.auctioneerService.update(id, updateAuctioneerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.auctioneerService.remove(id);
  }
}