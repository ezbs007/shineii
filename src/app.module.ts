import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Auctioneer } from './entities/auctioneer.entity';
import { JobPost } from './entities/job-post.entity';
import { JobPostsModule } from './job-posts/job-posts.module';
import { AdminModule } from './admin/admin.module';
import { BiddersModule } from './bidders/bidders.module';
import { Bidder } from './entities/bidder.entity';
import { Bid } from './entities/bid.entity';
import { BidsModule } from './bids/bids.module';
import { Job } from './entities/job.entity';
import { JobsModule } from './jobs/jobs.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { Payment } from './entities/payment.entity';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'ms_backend',
      entities: [User, Auctioneer, JobPost, Bidder, Bid, Job, Payment],
      synchronize: true,
    }),
    AuthModule,
    JobPostsModule,
    AdminModule,
    BiddersModule,
    BidsModule,
    JobsModule,
    DashboardModule,
    PaymentsModule,
  ],
})
export class AppModule {}