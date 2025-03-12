import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Job } from '../entities/job.entity';
import { Bid } from '../entities/bid.entity';
import { Review } from '../entities/review.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getCustomerMetrics(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['auctioneer']
    });

    if (!user?.auctioneer) {
      throw new UnauthorizedException('Only customers can access this dashboard');
    }

    const [
      totalRequests,
      pendingRequests,
      ongoingCleanings,
      completedCleanings,
      totalSpentResult,
      averageRatingResult,
      activeBids
    ] = await Promise.all([
      // Total cleaning requests posted
      this.jobPostRepository.count({
        where: { auctioneer: { id: user.auctioneer.id } }
      }),

      // Pending requests
      this.jobPostRepository.count({
        where: { 
          auctioneer: { id: user.auctioneer.id },
          status: 'active'
        }
      }),

      // Ongoing cleanings
      this.jobRepository.count({
        where: {
          auctioneer: { id: user.auctioneer.id },
          payment_status: 'pending'
        }
      }),

      // Completed cleanings
      this.jobRepository.count({
        where: {
          auctioneer: { id: user.auctioneer.id },
          payment_status: 'completed'
        }
      }),

      // Total spent using subquery
      this.jobRepository
        .createQueryBuilder('job')
        .select('COALESCE(SUM(job.payment_amount), 0)', 'total')
        .where(qb => {
          const subQuery = qb
            .subQuery()
            .select('auctioneer.id')
            .from('auctioneer', 'auctioneer')
            .where('auctioneer.id = :auctioneerId')
            .getQuery();
          return 'job.auctioneer.id IN ' + subQuery;
        })
        .setParameter('auctioneerId', user.auctioneer.id)
        .getRawOne(),"0",

      // Average cleaner rating using subquery
      // this.reviewRepository
      //   .createQueryBuilder('review')
      //   .select('COALESCE(AVG(review.rating), 0)', 'average')
      //   .where(qb => {
      //     const subQuery = qb
      //       .subQuery()
      //       .select('job.id')
      //       .from('job', 'job')
      //       .where('job.auctioneer_id = :auctioneerId')
      //       .getQuery();
      //     return 'review.job_id IN ' + subQuery;
      //   })
      //   .setParameter('auctioneerId', user.auctioneer.id)
      //   .getRawOne().average.toFixed(1),

      // Bids received on active requests using subquery
      this.bidRepository
      .createQueryBuilder('bid')
      .innerJoin('bid.job_post', 'job_post')
      .innerJoin('job_post.auctioneer', 'auctioneer')
      .where(qb => {
        return 'EXISTS ' + qb
          .subQuery()
          .select('1')
          .from('job_post', 'jp')
          .innerJoin('jp.auctioneer', 'a')
          .where('jp.id = bid.job_post.id')
          .andWhere('a.id = :auctioneerId')
          .andWhere('jp.status = :status')
          .getQuery();
      })
      .setParameter('auctioneerId', user.auctioneer.id)
      .setParameter('status', 'active')
      .getCount()
    ]);

    return {
      success: true,
      data: {
        totalCleaningRequestsPosted: totalRequests,
        pendingRequests,
        ongoingCleanings,
        completedCleanings,
        totalSpent: `$${Number(totalSpentResult?.total || 0).toFixed(2)}`,
        averageCleanerRating: parseFloat(averageRatingResult),
        bidsReceivedOnActiveRequests: activeBids
      }
    };
  }

  async getSupplierMetrics(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bidder']
    });

    if (!user?.bidder) {
      throw new UnauthorizedException('Only suppliers can access this dashboard');
    }

    const [
      totalBids,
      acceptedBids,
      ongoingJobs,
      completedJobs,
      totalEarningsResult,
      averageRatingResult,
      responseRate
    ] = await Promise.all([
      // Total bids placed
      this.bidRepository.count({
        where: { bidder: { id: user.bidder.id } }
      }),

      // Bids won (accepted)
      this.jobRepository.count({
        where: { bidder: { id: user.bidder.id } }
      }),

      // Ongoing jobs
      this.jobRepository.count({
        where: {
          bidder: { id: user.bidder.id },
          payment_status: 'pending'
        }
      }),

      // Completed jobs
      this.jobRepository.count({
        where: {
          bidder: { id: user.bidder.id },
          payment_status: 'completed'
        }
      }),

      // Total earnings using subquery
      this.jobRepository
        .createQueryBuilder('job')
        .select('COALESCE(SUM(job.payment_amount), 0)', 'total')
        .where(qb => {
          const subQuery = qb
            .subQuery()
            .select('bidder.id')
            .from('bidder', 'bidder')
            .where('bidder.id = :bidderId')
            .getQuery();
          return 'job.bidder.id IN ' + subQuery;
        })
        .setParameter('bidderId', user.bidder.id)
        .getRawOne(),"0",

      // Average rating from owners using subquery
      // this.reviewRepository
      //   .createQueryBuilder('review')
      //   .select('COALESCE(AVG(review.rating), 0)', 'average')
      //   .where(qb => {
      //     const subQuery = qb
      //       .subQuery()
      //       .select('job.id')
      //       .from('job', 'job')
      //       .where('job.bidder_id = :bidderId')
      //       .getQuery();
      //     return 'review.job_id IN ' + subQuery;
      //   })
      //   .setParameter('bidderId', user.bidder.id)
      //   .getRawOne().average.toFixed(1),

      // Response rate calculation
      this.calculateResponseRate(user.bidder.id)
    ]);

    return {
      success: true,
      data: {
        totalBidsPlaced: totalBids,
        bidsWonAccepted: acceptedBids,
        ongoingJobs,
        completedJobs,
        totalEarnings: `$${Number(totalEarningsResult?.total || 0).toFixed(2)}`,
        averageRatingFromOwners: parseFloat(averageRatingResult),
        responseRateToRequests: `${responseRate}%`
      }
    };
  }

  private async calculateResponseRate(bidderId: number): Promise<number> {
    const [totalEligiblePosts, totalBids] = await Promise.all([
      // Get total job posts in bidder's area using subquery
      this.jobPostRepository
        .createQueryBuilder('job_post')
        .where('job_post.status = :status')
        .setParameter('status', 'active')
        .getCount(),

      // Get total bids placed by bidder using subquery
      this.bidRepository
        .createQueryBuilder('bid')
        .where(qb => {
          const subQuery = qb
            .subQuery()
            .select('bidder.id')
            .from('bidder', 'bidder')
            .where('bidder.id = :bidderId')
            .getQuery();
          return 'bid.bidder.id IN ' + subQuery;
        })
        .setParameter('bidderId', bidderId)
        .getCount()
    ]);

    if (totalEligiblePosts === 0) return 100;
    return Math.round((totalBids / totalEligiblePosts) * 100);
  }
}