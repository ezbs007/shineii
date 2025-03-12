import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bidder } from '../../entities/bidder.entity';
import { User } from '../../entities/user.entity';
import { BidderResponse } from '../interfaces/bidder-response.interface';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class BidderDetailsService {
  constructor(
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getBidderDetails(userId: number): Promise<BidderResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['bidder'],
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (user.user_type !== 'bidder') {
        throw new UnauthorizedException('User is not a bidder');
      }

      if (!user.bidder) {
        throw new NotFoundException('Bidder profile not found');
      }

      return {
        success: true,
        message: 'Bidder details retrieved successfully',
        data: {
          id: user.bidder.id,
          title: user.bidder.title,
          bio_description: user.bidder.bio_discription,
          contact_number: user.bidder.contact_number,
          address: user.bidder.address,
          latitude: user.bidder.latitude,
          longitude: user.bidder.longitude,
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: {
          code: ErrorUtils.getErrorCode(error),
          details: error.message,
        },
      };
    }
  }
}