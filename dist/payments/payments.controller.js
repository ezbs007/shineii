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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_payment_dto_1 = require("./dto/create-payment.dto");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async createPaymentIntent(req, createPaymentDto) {
        const payment = await this.paymentsService.createPaymentIntent(createPaymentDto.jobId, req.user.userId);
        return {
            clientSecret: payment.stripeClientSecret,
            paymentId: payment.id,
        };
    }
    async handleWebhook(payload, signature, req) {
        return this.paymentsService.handleWebhookEvent(req.rawBody, signature);
    }
    async confirmJobPayment(jobId) {
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
    async getPaymentStatus(id) {
        return this.paymentsService.getPaymentStatus(id);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('create-intent'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createPaymentIntent", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "handleWebhook", null);
__decorate([
    (0, common_1.Put)('jobs/:jobId/confirm'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "confirmJobPayment", null);
__decorate([
    (0, common_1.Get)(':id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentStatus", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map