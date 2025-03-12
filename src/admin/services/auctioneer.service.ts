import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auctioneer } from '../../entities/auctioneer.entity';
import { User } from '../../entities/user.entity';
import { CreateAuctioneerDto } from '../dto/create-auctioneer.dto';
import { createHash } from 'crypto';

@Injectable()
export class AuctioneerService {
  constructor(
    @InjectRepository(Auctioneer)
    private auctioneerRepository: Repository<Auctioneer>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  async findAll() {
    return this.auctioneerRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const auctioneer = await this.auctioneerRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!auctioneer) {
      throw new NotFoundException('Auctioneer not found');
    }
    return auctioneer;
  }

  async create(createAuctioneerDto: CreateAuctioneerDto) {
    const hashedPassword = this.hashPassword(createAuctioneerDto.password);
    
    const user = this.userRepository.create({
      email: createAuctioneerDto.email,
      password: hashedPassword,
      first_name: createAuctioneerDto.first_name,
      last_name: createAuctioneerDto.last_name,
      user_type: 'auctioneer',
    });
    
    const savedUser = await this.userRepository.save(user);
    
    const auctioneer = this.auctioneerRepository.create({
      company_name: createAuctioneerDto.company_name,
      contact_number: createAuctioneerDto.contact_number,
      address: createAuctioneerDto.address,
      user: savedUser,
    });
    
    return this.auctioneerRepository.save(auctioneer);
  }

  async update(id: number, updateAuctioneerDto: CreateAuctioneerDto) {
    const auctioneer = await this.findOne(id);
    
    Object.assign(auctioneer, {
      company_name: updateAuctioneerDto.company_name,
      contact_number: updateAuctioneerDto.contact_number,
      address: updateAuctioneerDto.address,
    });
    
    if (updateAuctioneerDto.password) {
      const hashedPassword = this.hashPassword(updateAuctioneerDto.password);
      await this.userRepository.update(auctioneer.user.id, {
        password: hashedPassword,
      });
    }
    
    return this.auctioneerRepository.save(auctioneer);
  }

  async remove(id: number) {
    const auctioneer = await this.findOne(id);
    await this.userRepository.remove(auctioneer.user);
    return this.auctioneerRepository.remove(auctioneer);
  }
}