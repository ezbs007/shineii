import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Payment } from '../entities/payment.entity';
import { Job } from '../entities/job.entity';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { StripeService } from './stripe.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Job]),
    ConfigModule.forRoot(),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService],
  exports: [PaymentsService],
})
export class PaymentsModule {}