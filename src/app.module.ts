import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JobPostsModule } from './job-posts/job-posts.module';
import { BiddersModule } from './bidders/bidders.module';
import { BidsModule } from './bids/bids.module';
import { AdminModule } from './admin/admin.module';
import { JobsModule } from './jobs/jobs.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { User } from './entities/user.entity';
import { SiteSettings } from './entities/site-settings.entity';
import { Bidder } from './entities/bidder.entity';
import { Auctioneer } from './entities/auctioneer.entity';
import { JobPost } from './entities/job-post.entity';
import { Bid } from './entities/bid.entity';
import { Job } from './entities/job.entity';
import { ChatRoom } from './entities/chat-room.entity';
import { Review } from './entities/review.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'auction_db',
      entities: [
        User,
        SiteSettings,
        Bidder,
        Auctioneer,
        JobPost,
        Bid,
        Job,
        ChatRoom,
        Review,
      ],
      synchronize: true,
    }),
    AuthModule,
    JobPostsModule,
    BiddersModule,
    BidsModule,
    AdminModule,
    JobsModule,
    DashboardModule,
  ],
})
export class AppModule {}