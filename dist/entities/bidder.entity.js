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
exports.Bidder = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bid_entity_1 = require("./bid.entity");
const job_entity_1 = require("./job.entity");
let Bidder = class Bidder {
};
exports.Bidder = Bidder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bidder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bidder.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bidder.prototype, "bio_discription", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bidder.prototype, "contact_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bidder.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Bidder.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Bidder.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.bidder),
    __metadata("design:type", user_entity_1.User)
], Bidder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bid_entity_1.Bid, bid => bid.bidder),
    __metadata("design:type", Array)
], Bidder.prototype, "bids", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_entity_1.Job, job => job.bidder),
    __metadata("design:type", Array)
], Bidder.prototype, "jobs", void 0);
exports.Bidder = Bidder = __decorate([
    (0, typeorm_1.Entity)()
], Bidder);
//# sourceMappingURL=bidder.entity.js.map