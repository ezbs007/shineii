import { Controller, Post, Body, Get, Put, Param, UseGuards, Request, Headers, RawBodyRequest } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @UseGuards(JwtAuthGuard)
  async createPaymentIntent(@Request() req, @Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentsService.createPaymentIntent(
      createPaymentDto.jobId,
      req.user.userId,
    );

    return {
      clientSecret: payment.stripeClientSecret,
      paymentId: payment.id,
    };
  }

  @Post('webhook')
  async handleWebhook(
    @Body() payload: any,
    @Headers('stripe-signature') signature: string,
    @Request() req: RawBodyRequest<any>,
  ) {
    return this.paymentsService.handleWebhookEvent(req.rawBody, signature);
  }

  @Put('jobs/:jobId/confirm')
  @UseGuards(JwtAuthGuard)
  async confirmJobPayment(@Param('jobId') jobId: string) {
    const payment = await this.paymentsService.confirmJobPayment(jobId);
    return {
      success: true,
      message: 'Payment status updated successfully',
      data: {
        payment: {
          id: payment.id,
          status: payment.status,
          amount: payment.amount,
          currency: payment.currency,
          createdAt: payment.createdAt,
          updatedAt: payment.updatedAt
        },
        job: {
          id: payment.job.id,
          status: payment.job.payment_status,
          job_start_date: payment.job.job_start_date,
          job_end_date: payment.job.job_end_date,
          auctioneer: {
            company_name: payment.job.auctioneer.company_name,
            contact_number: payment.job.auctioneer.contact_number
          },
          bidder: {
            title: payment.job.bidder.title,
            contact_number: payment.job.bidder.contact_number
          }
        }
      }
    };
  }

  @Get(':id/status')
  @UseGuards(JwtAuthGuard)
  async getPaymentStatus(@Param('id') id: string) {
    return this.paymentsService.getPaymentStatus(id);
  }
}