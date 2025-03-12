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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("../entities/job.entity");
const bid_entity_1 = require("../entities/bid.entity");
const user_entity_1 = require("../entities/user.entity");
const job_post_entity_1 = require("../entities/job-post.entity");
const error_util_1 = require("../common/utils/error.util");
const job_mapper_1 = require("./mappers/job.mapper");
let JobsService = class JobsService {
    constructor(jobRepository, bidRepository, userRepository, jobPostRepository) {
        this.jobRepository = jobRepository;
        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
        this.jobPostRepository = jobPostRepository;
    }
    async validateUser(userId, type) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['auctioneer', 'bidder']
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (type === 'auctioneer' && !user.auctioneer) {
            throw new common_1.UnauthorizedException('Only auctioneers can perform this action');
        }
        if (type === 'bidder' && !user.bidder) {
            throw new common_1.UnauthorizedException('Only bidders can perform this action');
        }
        return user;
    }
    async createFromBid(userId, bidId) {
        const user = await this.validateUser(userId, 'auctioneer');
        const bid = await this.bidRepository.findOne({
            where: { id: bidId },
            relations: [
                'job_post',
                'job_post.auctioneer',
                'bidder'
            ],
        });
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (bid.job_post.auctioneer.id !== user.auctioneer.id) {
            throw new common_1.UnauthorizedException('You can only create jobs for your own job posts');
        }
        const existingJob = await this.jobRepository.findOne({
            where: { bid: { id: bidId } }
        });
        if (existingJob) {
            throw new common_1.ConflictException('This bid is already associated with a job');
        }
        bid.job_post.status = 'bid_accepted';
        await this.jobPostRepository.save(bid.job_post);
        const job = this.jobRepository.create({
            job: `Boat ${bid.job_post.boatLength}ft`,
            auctioneer: user.auctioneer,
            bidder: bid.bidder,
            payment_amount: bid.bid_amount,
            payment_status: 'pending',
            job_start_date: bid.job_post.job_start_date,
            job_end_date: bid.job_post.job_end_date,
            bid: bid
        });
        return this.jobRepository.save(job);
    }
    async getAuctioneerJobs(userId, pagination) {
        try {
            const user = await this.validateUser(userId, 'auctioneer');
            const [jobs, total] = await this.jobRepository.findAndCount({
                where: { auctioneer: { id: user.auctioneer.id } },
                relations: [
                    'bidder',
                    'bidder.user',
                    'bid',
                    'bid.job_post',
                    'reviews'
                ],
                order: { id: 'DESC' },
                skip: (pagination === null || pagination === void 0 ? void 0 : pagination.page) ? (pagination.page - 1) * (pagination.limit || 10) : 0,
                take: (pagination === null || pagination === void 0 ? void 0 : pagination.limit) || 10
            });
            return {
                success: true,
                message: 'Auctioneer jobs retrieved successfully',
                data: jobs.map(job => job_mapper_1.JobMapper.toDTO(job)),
                total,
                page: (pagination === null || pagination === void 0 ? void 0 : pagination.page) || 1,
                totalPages: Math.ceil(total / ((pagination === null || pagination === void 0 ? void 0 : pagination.limit) || 10))
            };
        }
        catch (error) {
            return error_util_1.ErrorUtil.createErrorResponse(error);
        }
    }
    async getBidderJobs(userId, pagination) {
        try {
            const user = await this.validateUser(userId, 'bidder');
            const [jobs, total] = await this.jobRepository.findAndCount({
                where: { bidder: { id: user.bidder.id } },
                relations: [
                    'auctioneer',
                    'auctioneer.user',
                    'bid',
                    'bid.job_post',
                    'reviews'
                ],
                order: { id: 'DESC' },
                skip: (pagination === null || pagination === void 0 ? void 0 : pagination.page) ? (pagination.page - 1) * (pagination.limit || 10) : 0,
                take: (pagination === null || pagination === void 0 ? void 0 : pagination.limit) || 10
            });
            return {
                success: true,
                message: 'Bidder jobs retrieved successfully',
                data: jobs.map(job => job_mapper_1.JobMapper.toDTO(job)),
                total,
                page: (pagination === null || pagination === void 0 ? void 0 : pagination.page) || 1,
                totalPages: Math.ceil(total / ((pagination === null || pagination === void 0 ? void 0 : pagination.limit) || 10))
            };
        }
        catch (error) {
            return error_util_1.ErrorUtil.createErrorResponse(error);
        }
    }
    async getJobDetails(userId, jobId) {
        var _a, _b;
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['auctioneer', 'bidder']
            });
            const job = await this.jobRepository.findOne({
                where: { id: jobId },
                relations: [
                    'auctioneer',
                    'auctioneer.user',
                    'bidder',
                    'bidder.user',
                    'bid',
                    'bid.job_post',
                    'reviews'
                ]
            });
            if (!job) {
                throw new common_1.NotFoundException('Job not found');
            }
            if (((_a = user.auctioneer) === null || _a === void 0 ? void 0 : _a.id) !== job.auctioneer.id && ((_b = user.bidder) === null || _b === void 0 ? void 0 : _b.id) !== job.bidder.id) {
                throw new common_1.UnauthorizedException('You do not have permission to view this job');
            }
            return {
                success: true,
                message: 'Job details retrieved successfully',
                data: job_mapper_1.JobMapper.toDTO(job)
            };
        }
        catch (error) {
            return error_util_1.ErrorUtil.createErrorResponse(error);
        }
    }
    async getCalendarJobs(userId, { month, year }) {
        try {
            const user = await this.validateUser(userId, 'bidder');
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);
            const jobs = await this.jobRepository.find({
                where: {
                    bidder: { id: user.bidder.id },
                    job_start_date: (0, typeorm_2.Between)(startDate, endDate)
                },
                relations: [
                    'auctioneer',
                    'auctioneer.user',
                    'bid',
                    'bid.job_post'
                ],
                order: {
                    job_start_date: 'ASC'
                }
            });
            const calendarJobs = jobs.map(job => job_mapper_1.JobMapper.toCalendarDTO(job));
            return {
                success: true,
                message: 'Calendar jobs retrieved successfully',
                data: calendarJobs
            };
        }
        catch (error) {
            return error_util_1.ErrorUtil.createErrorResponse(error);
        }
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(1, (0, typeorm_1.InjectRepository)(bid_entity_1.Bid)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(job_post_entity_1.JobPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JobsService);
//# sourceMappingURL=jobs.service.js.map