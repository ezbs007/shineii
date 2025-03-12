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
exports.BidsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bid_entity_1 = require("../entities/bid.entity");
const bidder_entity_1 = require("../entities/bidder.entity");
const job_post_entity_1 = require("../entities/job-post.entity");
const user_entity_1 = require("../entities/user.entity");
let BidsService = class BidsService {
    constructor(bidRepository, bidderRepository, jobPostRepository, userRepository) {
        this.bidRepository = bidRepository;
        this.bidderRepository = bidderRepository;
        this.jobPostRepository = jobPostRepository;
        this.userRepository = userRepository;
    }
    async create(userId, createBidDto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['bidder'],
        });
        if (!user || user.user_type !== 'bidder') {
            throw new common_1.UnauthorizedException('Only bidders can create bids');
        }
        if (!user.bidder) {
            throw new common_1.UnauthorizedException('Bidder profile not found');
        }
        const jobPost = await this.jobPostRepository.findOne({
            where: { id: createBidDto.jobPostId },
        });
        if (!jobPost) {
            throw new common_1.NotFoundException('Job post not found');
        }
        jobPost.status = 'bid_placed';
        await this.jobPostRepository.save(jobPost);
        const bid = this.bidRepository.create({
            job_post: jobPost,
            bidder: user.bidder,
            bid_amount: createBidDto.bid_amount,
            message: createBidDto.message,
            negosiation: true,
        });
        return this.bidRepository.save(bid);
    }
};
exports.BidsService = BidsService;
exports.BidsService = BidsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bid_entity_1.Bid)),
    __param(1, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __param(2, (0, typeorm_1.InjectRepository)(job_post_entity_1.JobPost)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BidsService);
//# sourceMappingURL=bids.service.js.map