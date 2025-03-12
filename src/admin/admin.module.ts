import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { Auctioneer } from '../entities/auctioneer.entity';
import { Bidder } from '../entities/bidder.entity';
import { AdminController } from './controllers/admin.controller';
import { AuctioneerController } from './controllers/auctioneer.controller';
import { BidderAdminController } from './controllers/bidder.controller';
import { AdminService } from './services/admin.service';
import { AuctioneerService } from './services/auctioneer.service';
import { BidderAdminService } from './services/bidder.service';
import { AdminMiddleware } from './admin.middleware';
import { JobPostAdminController } from './controllers/job-post.admin.controller';
import { Job } from 'src/entities/job.entity';
import { JobPostAdminService } from './services/job-post.admin.service';
import { JobPost } from 'src/entities/job-post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Auctioneer, Bidder, JobPost]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    AdminController,
    AuctioneerController,
    BidderAdminController,
    JobPostAdminController,
  ],
  providers: [
    AdminService,
    AuctioneerService,
    BidderAdminService,
    JobPostAdminService,
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude(
        { path: '/admin/login', method: RequestMethod.ALL },
        
        { path: '/public/*', method: RequestMethod.ALL }
      )
      .forRoutes({ path: 'admin*', method: RequestMethod.ALL });
  }
}

// export class AdminModule {}