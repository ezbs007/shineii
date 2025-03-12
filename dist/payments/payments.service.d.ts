import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { Job } from '../entities/job.entity';
import { StripeService } from './stripe.service';
export declare class PaymentsService {
    private paymentRepository;
    private jobRepository;
    private stripeService;
    constructor(paymentRepository: Repository<Payment>, jobRepository: Repository<Job>, stripeService: StripeService);
    createPaymentIntent(jobId: string, userId: string): Promise<Payment>;
    handleWebhookEvent(payload: Buffer, signature: string): Promise<void>;
    private handlePaymentSuccess;
    private handlePaymentFailure;
    confirmJobPayment(jobId: string): Promise<Payment>;
    getPaymentStatus(paymentId: string): Promise<Payment>;
}
