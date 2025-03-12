import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from '../../entities/job-post.entity';
import { CreateJobPostDto } from '../dto/create-job-post.dto';
import { UpdateJobPostDto } from '../dto/update-job-post.dto';

@Injectable()
export class JobPostAdminService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>
  ) {}

  async findAll() {
    return this.jobPostRepository.find({
      relations: ['auctioneer', 'auctioneer.user', 'bids'],
      order: { bid_end_date: 'DESC' }
    });
  }

  async findOne(id: number) {
    const jobPost = await this.jobPostRepository.findOne({
      where: { id },
      relations: ['auctioneer', 'auctioneer.user', 'bids', 'bids.bidder', 'bids.bidder.user']
    });

    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }

    return jobPost;
  }

  async create(createJobPostDto: CreateJobPostDto) {
    const jobPost = this.jobPostRepository.create(createJobPostDto);
    return this.jobPostRepository.save(jobPost);
  }

  async update(id: number, updateJobPostDto: UpdateJobPostDto) {
    const jobPost = await this.findOne(id);
    Object.assign(jobPost, updateJobPostDto);
    return this.jobPostRepository.save(jobPost);
  }

  async remove(id: number) {
    const jobPost = await this.findOne(id);
    return this.jobPostRepository.remove(jobPost);
  }

  async count() {
    return this.jobPostRepository.count();
  }
}