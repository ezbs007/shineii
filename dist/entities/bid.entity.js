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
exports.Bid = void 0;
const typeorm_1 = require("typeorm");
const job_post_entity_1 = require("./job-post.entity");
const bidder_entity_1 = require("./bidder.entity");
const chat_room_entity_1 = require("./chat-room.entity");
let Bid = class Bid {
};
exports.Bid = Bid;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bid.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_post_entity_1.JobPost, jobPost => jobPost.bids),
    __metadata("design:type", job_post_entity_1.JobPost)
], Bid.prototype, "job_post", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Bid.prototype, "bid_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Bid.prototype, "negosiation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bid.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bidder_entity_1.Bidder, bidder => bidder.bids),
    __metadata("design:type", bidder_entity_1.Bidder)
], Bid.prototype, "bidder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_room_entity_1.ChatRoom, chatRoom => chatRoom.bid),
    __metadata("design:type", Array)
], Bid.prototype, "chatRooms", void 0);
exports.Bid = Bid = __decorate([
    (0, typeorm_1.Entity)()
], Bid);
//# sourceMappingURL=bid.entity.js.map