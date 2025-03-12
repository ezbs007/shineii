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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_post_entity_1 = require("../entities/job-post.entity");
const job_entity_1 = require("../entities/job.entity");
const bid_entity_1 = require("../entities/bid.entity");
const review_entity_1 = require("../entities/review.entity");
const user_entity_1 = require("../entities/user.entity");
let DashboardService = class DashboardService {
    constructor(jobPostRepository, jobRepository, bidRepository, reviewRepository, userRepository) {
        this.jobPostRepository = jobPostRepository;
        this.jobRepository = jobRepository;
        this.bidRepository = bidRepository;
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }
    async getCustomerMetrics(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['auctioneer']
        });
        if (!(user === null || user === void 0 ? void 0 : user.auctioneer)) {
            throw new common_1.UnauthorizedException('Only customers can access this dashboard');
        }
        const [totalRequests, pendingRequests, ongoingCleanings, completedCleanings, totalSpentResult, averageRatingResult, activeBids] = await Promise.all([
            this.jobPostRepository.count({
                where: { auctioneer: { id: user.auctioneer.id } }
            }),
            this.jobPostRepository.count({
                where: {
                    auctioneer: { id: user.auctioneer.id },
                    status: 'active'
                }
            }),
            this.jobRepository.count({
                where: {
                    auctioneer: { id: user.auctioneer.id },
                    payment_status: 'pending'
                }
            }),
            this.jobRepository.count({
                where: {
                    auctioneer: { id: user.auctioneer.id },
                    payment_status: 'completed'
                }
            }),
            this.jobRepository
                .createQueryBuilder('job')
                .select('COALESCE(SUM(job.payment_amount), 0)', 'total')
                .where(qb => {
                const subQuery = qb
                    .subQuery()
                    .select('auctioneer.id')
                    .from('auctioneer', 'auctioneer')
                    .where('auctioneer.id = :auctioneerId')
                    .getQuery();
                return 'job.auctioneer_id IN ' + subQuery;
            })
                .setParameter('auctioneerId', user.auctioneer.id)
                .getRawOne(),
            this.reviewRepository
                .createQueryBuilder('review')
                .select('COALESCE(AVG(review.rating), 0)', 'average')
                .where(qb => {
                const subQuery = qb
                    .subQuery()
                    .select('job.id')
                    .from('job', 'job')
                    .where('job.auctioneer_id = :auctioneerId')
                    .getQuery();
                return 'review.job_id IN ' + subQuery;
            })
                .setParameter('auctioneerId', user.auctioneer.id)
                .getRawOne(),
            this.bidRepository
                .createQueryBuilder('bid')
                .where(qb => {
                const subQuery = qb
                    .subQuery()
                    .select('job_post.id')
                    .from('job_post', 'job_post')
                    .where('job_post.auctioneer_id = :auctioneerId')
                    .andWhere('job_post.status = :status')
                    .getQuery();
                return 'bid.job_post_id IN ' + subQuery;
            })
                .setParameter('auctioneerId', user.auctioneer.id)
                .setParameter('status', 'active')
                .getCount()
        ]);
        return {
            success: true,
            data: {
                totalCleaningRequestsPosted: totalRequests,
                pendingRequests,
                ongoingCleanings,
                completedCleanings,
                totalSpent: `$${totalSpentResult.total.toFixed(2)}`,
                averageCleanerRating: parseFloat(averageRatingResult.average.toFixed(1)),
                bidsReceivedOnActiveRequests: activeBids
            }
        };
    }
    async getSupplierMetrics(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['bidder']
        });
        if (!(user === null || user === void 0 ? void 0 : user.bidder)) {
            throw new common_1.UnauthorizedException('Only suppliers can access this dashboard');
        }
        const [totalBids, acceptedBids, ongoingJobs, completedJobs, totalEarningsResult, averageRatingResult, responseRate] = await Promise.all([
            this.bidRepository.count({
                where: { bidder: { id: user.bidder.id } }
            }),
            this.jobRepository.count({
                where: { bidder: { id: user.bidder.id } }
            }),
            this.jobRepository.count({
                where: {
                    bidder: { id: user.bidder.id },
                    payment_status: 'pending'
                }
            }),
            this.jobRepository.count({
                where: {
                    bidder: { id: user.bidder.id },
                    payment_status: 'completed'
                }
            }),
            this.jobRepository
                .createQueryBuilder('job')
                .select('COALESCE(SUM(job.payment_amount), 0)', 'total')
                .where(qb => {
                const subQuery = qb
                    .subQuery()
                    .select('bidder.id')
                    .from('bidder', 'bidder')
                    .where('bidder.id = :bidderId')
                    .getQuery();
                return 'job.bidder_id IN ' + subQuery;
            })
                .setParameter('bidderId', user.bidder.id)
                .getRawOne(),
            this.reviewRepository
                .createQueryBuilder('review')
                .select('COALESCE(AVG(review.rating), 0)', 'average')
                .where(qb => {
                const subQuery = qb
                    .subQuery()
                    .select('job.id')
                    .from('job', 'job')
                    .where('job.bidder_id = :bidderId')
                    .getQuery();
                return 'review.job_id IN ' + subQuery;
            })
                .setParameter('bidderId', user.bidder.id)
                .getRawOne(),
            this.calculateResponseRate(user.bidder.id)
        ]);
        return {
            success: true,
            data: {
                totalBidsPlaced: totalBids,
                bidsWonAccepted: acceptedBids,
                ongoingJobs,
                completedJobs,
                totalEarnings: `$${totalEarningsResult.total.toFixed(2)}`,
                averageRatingFromOwners: parseFloat(averageRatingResult.average.toFixed(1)),
                responseRateToRequests: `${responseRate}%`
            }
        };
    }
    async calculateResponseRate(bidderId) {
        const [totalEligiblePosts, totalBids] = await Promise.all([
            this.jobPostRepository
                .createQueryBuilder('job_post')
                .where('job_post.status = :status')
                .setParameter('status', 'active')
                .getCount(),
            this.bidRepository
                .createQueryBuilder('bid')
                .where(qb => {
                const subQuery = qb
                    .subQuery()
                    .select('bidder.id')
                    .from('bidder', 'bidder')
                    .where('bidder.id = :bidderId')
                    .getQuery();
                return 'bid.bidder_id IN ' + subQuery;
            })
                .setParameter('bidderId', bidderId)
                .getCount()
        ]);
        if (totalEligiblePosts === 0)
            return 100;
        return Math.round((totalBids / totalEligiblePosts) * 100);
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_post_entity_1.JobPost)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(2, (0, typeorm_1.InjectRepository)(bid_entity_1.Bid)),
    __param(3, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map