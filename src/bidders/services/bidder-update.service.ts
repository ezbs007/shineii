import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bidder } from '../../entities/bidder.entity';
import { User } from '../../entities/user.entity';
import { UpdateBidderDto } from '../dto/update-bidder.dto';
import { BidderResponse } from '../interfaces/bidder-response.interface';
import { LocationValidator } from '../validators/location.validator';
import { ErrorUtils } from '../../utils/error.utils';

@Injectable()
export class BidderUpdateService {
  constructor(
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async update(userId: number, updateBidderDto: UpdateBidderDto): Promise<BidderResponse> {
    try {
      // Validate user and permissions
      const user = await this.validateUserAndPermissions(userId);

      // Validate location if provided
      if (updateBidderDto.latitude || updateBidderDto.longitude) {
        LocationValidator.validate(updateBidderDto.latitude, updateBidderDto.longitude);
      }
      console.log(updateBidderDto);

      // Update bidder profile
      const updatedBidder = await this.updateBidderProfile(user.bidder, updateBidderDto);
      console.log(updatedBidder);

      return {
        success: true,
        message: 'Bidder profile updated successfully',
        data: {
          id: updatedBidder.id,
          title: updatedBidder.title,
          bio_description: updatedBidder.bio_discription,
          contact_number: updatedBidder.contact_number,
          address: updatedBidder.address,
          latitude: updatedBidder.latitude,
          longitude: updatedBidder.longitude,
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

  private async validateUserAndPermissions(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bidder'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.user_type !== 2) {
      throw new UnauthorizedException('Only bidders can update bidder profiles');
    }

    if (!user.bidder) {
      throw new NotFoundException('Bidder profile not found');
    }

    return user;
  }

  private async updateBidderProfile(bidder: Bidder, updateBidderDto: UpdateBidderDto): Promise<Bidder> {
    Object.assign(bidder, updateBidderDto);
    return this.bidderRepository.save(bidder);
  }

}