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
exports.JobPost = void 0;
const typeorm_1 = require("typeorm");
const auctioneer_entity_1 = require("./auctioneer.entity");
const bid_entity_1 = require("./bid.entity");
let JobPost = class JobPost {
};
exports.JobPost = JobPost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auctioneer_entity_1.Auctioneer, auctioneer => auctioneer.jobPosts),
    __metadata("design:type", auctioneer_entity_1.Auctioneer)
], JobPost.prototype, "auctioneer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], JobPost.prototype, "boatLength", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true }),
    __metadata("design:type", Array)
], JobPost.prototype, "additionalServices", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], JobPost.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], JobPost.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], JobPost.prototype, "preferredDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], JobPost.prototype, "max_bid_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], JobPost.prototype, "bid_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], JobPost.prototype, "bid_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], JobPost.prototype, "job_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], JobPost.prototype, "job_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['active', 'bid_placed', 'newcomment', 'bid_accepted', 'cancelled'],
        default: 'active'
    }),
    __metadata("design:type", String)
], JobPost.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bid_entity_1.Bid, bid => bid.job_post),
    __metadata("design:type", Array)
], JobPost.prototype, "bids", void 0);
exports.JobPost = JobPost = __decorate([
    (0, typeorm_1.Entity)()
], JobPost);
//# sourceMappingURL=job-post.entity.js.map