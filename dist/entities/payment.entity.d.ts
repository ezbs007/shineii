import { Job } from './job.entity';
export declare enum PaymentStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed",
    REFUNDED = "refunded"
}
export declare class Payment {
    id: string;
    job: Job;
    amount: number;
    currency: string;
    status: PaymentStatus;
    stripePaymentIntentId: string;
    stripeClientSecret: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
