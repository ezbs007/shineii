import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bidder } from '../../entities/bidder.entity';
import { User } from '../../entities/user.entity';
import { CreateBidderDto } from '../dto/create-bidder.dto';
import { UpdateBidderDto } from '../dto/update-bidder.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BidderAdminService {
  constructor(
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.bidderRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const bidder = await this.bidderRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!bidder) {
      throw new NotFoundException('Bidder not found');
    }
    return bidder;
  }

  async create(createBidderDto: CreateBidderDto) {
    const hashedPassword = await bcrypt.hash(createBidderDto.password, 10);
    
    const user = this.userRepository.create({
      email: createBidderDto.email,
      password: hashedPassword,
      first_name: createBidderDto.first_name,
      last_name: createBidderDto.last_name,
      user_type: 2,
    });
    
    const savedUser = await this.userRepository.save(user);
    
    const bidder = this.bidderRepository.create({
      title: createBidderDto.title,
      bio_discription: createBidderDto.bio_discription,
      contact_number: createBidderDto.contact_number,
      address: createBidderDto.address,
      user: savedUser,
    });
    
    return this.bidderRepository.save(bidder);
  }

  async update(id: number, updateBidderDto: UpdateBidderDto) {
    const bidder = await this.findOne(id);
    
    if (updateBidderDto.password) {
      const hashedPassword = await bcrypt.hash(updateBidderDto.password, 10);
      await this.userRepository.update(bidder.user.id, {
        password: hashedPassword,
      });
    }
    
    Object.assign(bidder, {
      title: updateBidderDto.title,
      bio_discription: updateBidderDto.bio_discription,
      contact_number: updateBidderDto.contact_number,
      address: updateBidderDto.address,
    });
    
    return this.bidderRepository.save(bidder);
  }

  async remove(id: number) {
    const bidder = await this.findOne(id);
    await this.userRepository.remove(bidder.user);
    return this.bidderRepository.remove(bidder);
  }

  async count() {
    return this.bidderRepository.count();
  }
}