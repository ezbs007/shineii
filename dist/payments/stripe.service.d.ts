import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
export declare class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createPaymentIntent(params: {
        amount: number;
        currency: string;
        metadata?: Record<string, any>;
    }): Promise<Stripe.PaymentIntent>;
    retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
    constructEventFromPayload(payload: string, signature: string): Promise<Stripe.Event>;
}
