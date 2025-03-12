import { RawBodyRequest } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPaymentIntent(req: any, createPaymentDto: CreatePaymentDto): Promise<{
        clientSecret: string;
        paymentId: string;
    }>;
    handleWebhook(payload: any, signature: string, req: RawBodyRequest<any>): Promise<void>;
    confirmJobPayment(jobId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            payment: {
                id: string;
                status: import("../entities/payment.entity").PaymentStatus;
                amount: number;
                currency: string;
                createdAt: Date;
                updatedAt: Date;
            };
            job: {
                id: number;
                status: string;
                job_start_date: Date;
                job_end_date: Date;
                auctioneer: {
                    company_name: string;
                    contact_number: string;
                };
                bidder: {
                    title: string;
                    contact_number: string;
                };
            };
        };
    }>;
    getPaymentStatus(id: string): Promise<import("../entities/payment.entity").Payment>;
}
