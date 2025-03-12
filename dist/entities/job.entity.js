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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const typeorm_1 = require("typeorm");
const auctioneer_entity_1 = require("./auctioneer.entity");
const bidder_entity_1 = require("./bidder.entity");
const review_entity_1 = require("./review.entity");
const bid_entity_1 = require("./bid.entity");
const payment_entity_1 = require("./payment.entity");
let Job = class Job {
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auctioneer_entity_1.Auctioneer, auctioneer => auctioneer.jobs),
    __metadata("design:type", auctioneer_entity_1.Auctioneer)
], Job.prototype, "auctioneer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bidder_entity_1.Bidder, bidder => bidder.jobs),
    __metadata("design:type", bidder_entity_1.Bidder)
], Job.prototype, "bidder", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Job.prototype, "job_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Job.prototype, "job_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Job.prototype, "payment_amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "payment_status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bid_entity_1.Bid),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", bid_entity_1.Bid)
], Job.prototype, "bid", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, review => review.job),
    __metadata("design:type", Array)
], Job.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, payment => payment.job),
    __metadata("design:type", Array)
], Job.prototype, "payments", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)()
], Job);
//# sourceMappingURL=job.entity.js.map