import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bidder } from '../../entities/bidder.entity';
import { User } from '../../entities/user.entity';
import { CreateBidderDto } from '../dto/create-bidder.dto';
import { UpdateBidderDto } from '../dto/update-bidder.dto';

@Injectable()
export class BiddersService {
  constructor(
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, createBidderDto: CreateBidderDto): Promise<Bidder> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bidder'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.user_type !== 'bidder') {
      throw new UnauthorizedException('Only bidders can create bidder profiles');
    }

    if (user.bidder) {
      throw new BadRequestException('Bidder profile already exists');
    }

    const bidder = this.bidderRepository.create({
      ...createBidderDto,
      user,
    });

    return this.bidderRepository.save(bidder);
  }

  async update(userId: number, updateBidderDto: UpdateBidderDto): Promise<Bidder> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bidder'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.user_type !== 'bidder') {
      throw new UnauthorizedException('Only bidders can update bidder profiles');
    }

    if (!user.bidder) {
      throw new BadRequestException('Bidder profile not found');
    }

    Object.assign(user.bidder, updateBidderDto);
    return this.bidderRepository.save(user.bidder);
  }
}