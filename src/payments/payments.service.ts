import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from '../entities/payment.entity';
import { Job } from '../entities/job.entity';
import { StripeService } from './stripe.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private stripeService: StripeService,
  ) {}

  async createPaymentIntent(jobId: string, userId: string): Promise<Payment> {
    const job = await this.jobRepository.findOne({
      where: { id: Number(jobId) },
      relations: ['auctioneer', 'auctioneer.user']
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.auctioneer.user.id !== Number(userId)) {
      throw new BadRequestException('Unauthorized to create payment for this job');
    }

    const amount = Math.round(job.payment_amount * 100); // Convert to cents for Stripe

    const paymentIntent = await this.stripeService.createPaymentIntent({
      amount,
      currency: 'usd',
      metadata: {
        jobId,
        userId,
      },
    });

    const payment = this.paymentRepository.create({
      job,
      amount: job.payment_amount,
      currency: 'usd',
      status: PaymentStatus.PENDING,
      stripePaymentIntentId: paymentIntent.id,
      stripeClientSecret: paymentIntent.client_secret,
      metadata: {
        jobId,
        userId,
      },
    });

    return this.paymentRepository.save(payment);
  }

  async handleWebhookEvent(payload: Buffer, signature: string): Promise<void> {
    try {
      const event = await this.stripeService.constructEventFromPayload(
        payload.toString(),
        signature,
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object);
          break;
      }
    } catch (error) {
      throw new BadRequestException(`Webhook Error: ${error.message}`);
    }
  }

  private async handlePaymentSuccess(paymentIntent: any): Promise<void> {
    const payment = await this.paymentRepository.findOne({
      where: { stripePaymentIntentId: paymentIntent.id },
      relations: ['job'],
    });

    if (payment) {
      payment.status = PaymentStatus.COMPLETED;
      payment.job.payment_status = 'completed';
      
      await this.jobRepository.save(payment.job);
      await this.paymentRepository.save(payment);
    }
  }

  private async handlePaymentFailure(paymentIntent: any): Promise<void> {
    const payment = await this.paymentRepository.findOne({
      where: { stripePaymentIntentId: paymentIntent.id },
      relations: ['job'],
    });

    if (payment) {
      payment.status = PaymentStatus.FAILED;
      payment.job.payment_status = 'failed';
      
      await this.jobRepository.save(payment.job);
      await this.paymentRepository.save(payment);
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { stripePaymentIntentId: paymentIntentId },
      relations: ['job'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const paymentIntent = await this.stripeService.retrievePaymentIntent(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      payment.status = PaymentStatus.COMPLETED;
      payment.job.payment_status = 'completed';
      await this.jobRepository.save(payment.job);
    } else {
      payment.status = PaymentStatus.FAILED;
    }

    return this.paymentRepository.save(payment);
  }

  async getPaymentStatus(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['job'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async confirmJobPayment(jobId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { job: { id: Number(jobId) } },
      relations: ['job', 'job.auctioneer', 'job.bidder'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found for this job');
    }

    const paymentIntent = await this.stripeService.retrievePaymentIntent(payment.stripePaymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      payment.status = PaymentStatus.COMPLETED;
      payment.job.payment_status = 'completed';
      await this.jobRepository.save(payment.job);
    } else {
      payment.status = PaymentStatus.FAILED;
      payment.job.payment_status = 'failed';
      await this.jobRepository.save(payment.job);
    }

    return this.paymentRepository.save(payment);
  }

}