import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bidder } from '../../entities/bidder.entity';
import { User } from '../../entities/user.entity';
import { CreateBidderDto, UpdateBidderDto } from '../dto/bidder.dto';
import { IBidderResponse } from '../interfaces/bidder.interface';
import { LocationUtil } from '../../common/utils/location.util';
import { ErrorUtil } from '../../common/utils/error.util';

@Injectable()
export class BidderProfileService {
  constructor(
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, createBidderDto: CreateBidderDto): Promise<IBidderResponse> {
    try {
      const user = await this.validateUser(userId);
      LocationUtil.validateCoordinates(createBidderDto.latitude, createBidderDto.longitude);

      const bidder = this.bidderRepository.create({
        ...createBidderDto,
        user,
      });

      const savedBidder = await this.bidderRepository.save(bidder);
      return this.formatBidderResponse(savedBidder, 'Bidder profile created successfully');
    } catch (error) {
      return ErrorUtil.createErrorResponse(error);
    }
  }

  async update(userId: number, updateBidderDto: UpdateBidderDto): Promise<IBidderResponse> {
    try {
      const user = await this.validateUser(userId);
      LocationUtil.validateCoordinates(updateBidderDto.latitude, updateBidderDto.longitude);

      const bidder = await this.bidderRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      if (!bidder) {
        throw new NotFoundException('Bidder profile not found');
      }

      Object.assign(bidder, updateBidderDto);
      const updatedBidder = await this.bidderRepository.save(bidder);
      return this.formatBidderResponse(updatedBidder, 'Bidder profile updated successfully');
    } catch (error) {
      return ErrorUtil.createErrorResponse(error);
    }
  }

  async getDetails(userId: number): Promise<IBidderResponse> {
    try {
      const user = await this.validateUser(userId);
      const bidder = await this.bidderRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      if (!bidder) {
        throw new NotFoundException('Bidder profile not found');
      }

      return this.formatBidderResponse(bidder, 'Bidder details retrieved successfully');
    } catch (error) {
      return ErrorUtil.createErrorResponse(error);
    }
  }

  private async validateUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.user_type !== 'bidder') {
      throw new UnauthorizedException('User is not a bidder');
    }

    return user;
  }

  private formatBidderResponse(bidder: Bidder, message: string): IBidderResponse {
    return {
      success: true,
      message,
      data: {
        id: bidder.id,
        title: bidder.title,
        bio_description: bidder.bio_discription,
        contact_number: bidder.contact_number,
        address: bidder.address,
        latitude: bidder.latitude,
        longitude: bidder.longitude,
        user: {
          id: bidder.user.id,
          email: bidder.user.email,
          first_name: bidder.user.first_name,
          last_name: bidder.user.last_name,
        },
      },
    };
  }
}