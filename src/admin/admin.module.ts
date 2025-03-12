import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { Auctioneer } from '../entities/auctioneer.entity';
import { Bidder } from '../entities/bidder.entity';
import { JobPost } from '../entities/job-post.entity';
import { AdminController } from './controllers/admin.controller';
import { AuctioneerController } from './controllers/auctioneer.controller';
import { BidderAdminController } from './controllers/bidder.controller';
import { JobPostAdminController } from './controllers/job-post.admin.controller';
import { AdminService } from './services/admin.service';
import { AuctioneerService } from './services/auctioneer.service';
import { BidderAdminService } from './services/bidder.service';
import { JobPostAdminService } from './services/job-post.admin.service';
import { AdminMiddleware } from './middleware/admin.middleware';

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
      .exclude('admin/login')
      .forRoutes('*');
  }
}