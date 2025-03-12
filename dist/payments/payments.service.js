"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../entities/payment.entity");
const job_entity_1 = require("../entities/job.entity");
const stripe_service_1 = require("./stripe.service");
let PaymentsService = class PaymentsService {
    constructor(paymentRepository, jobRepository, stripeService) {
        this.paymentRepository = paymentRepository;
        this.jobRepository = jobRepository;
        this.stripeService = stripeService;
    }
    async createPaymentIntent(jobId, userId) {
        const job = await this.jobRepository.findOne({
            where: { id: jobId },
            relations: ['auctioneer', 'auctioneer.user']
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.auctioneer.user.id !== userId) {
            throw new common_1.BadRequestException('Unauthorized to create payment for this job');
        }
        const amount = Math.round(job.payment_amount * 100);
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
            status: payment_entity_1.PaymentStatus.PENDING,
            stripePaymentIntentId: paymentIntent.id,
            stripeClientSecret: paymentIntent.client_secret,
            metadata: {
                jobId,
                userId,
            },
        });
        return this.paymentRepository.save(payment);
    }
    async handleWebhookEvent(payload, signature) {
        try {
            const event = await this.stripeService.constructEventFromPayload(payload.toString(), signature);
            switch (event.type) {
                case 'payment_intent.succeeded':
                    await this.handlePaymentSuccess(event.data.object);
                    break;
                case 'payment_intent.payment_failed':
                    await this.handlePaymentFailure(event.data.object);
                    break;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(`Webhook Error: ${error.message}`);
        }
    }
    async handlePaymentSuccess(paymentIntent) {
        const payment = await this.paymentRepository.findOne({
            where: { stripePaymentIntentId: paymentIntent.id },
            relations: ['job'],
        });
        if (payment) {
            payment.status = payment_entity_1.PaymentStatus.COMPLETED;
            payment.job.payment_status = 'completed';
            await this.jobRepository.save(payment.job);
            await this.paymentRepository.save(payment);
        }
    }
    async handlePaymentFailure(paymentIntent) {
        const payment = await this.paymentRepository.findOne({
            where: { stripePaymentIntentId: paymentIntent.id },
            relations: ['job'],
        });
        if (payment) {
            payment.status = payment_entity_1.PaymentStatus.FAILED;
            payment.job.payment_status = 'failed';
            await this.jobRepository.save(payment.job);
            await this.paymentRepository.save(payment);
        }
    }
    async confirmJobPayment(jobId) {
        const payment = await this.paymentRepository.findOne({
            where: { job: { id: jobId } },
            relations: ['job', 'job.auctioneer', 'job.bidder'],
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found for this job');
        }
        const paymentIntent = await this.stripeService.retrievePaymentIntent(payment.stripePaymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            payment.status = payment_entity_1.PaymentStatus.COMPLETED;
            payment.job.payment_status = 'completed';
            await this.jobRepository.save(payment.job);
        }
        else {
            payment.status = payment_entity_1.PaymentStatus.FAILED;
            payment.job.payment_status = 'failed';
            await this.jobRepository.save(payment.job);
        }
        return this.paymentRepository.save(payment);
    }
    async getPaymentStatus(paymentId) {
        const payment = await this.paymentRepository.findOne({
            where: { id: paymentId },
            relations: ['job'],
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        return payment;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        stripe_service_1.StripeService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map