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
exports.JobPostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_post_entity_1 = require("../entities/job-post.entity");
const bidder_entity_1 = require("../entities/bidder.entity");
const user_entity_1 = require("../entities/user.entity");
let JobPostsService = class JobPostsService {
    constructor(jobPostRepository, bidderRepository, userRepository) {
        this.jobPostRepository = jobPostRepository;
        this.bidderRepository = bidderRepository;
        this.userRepository = userRepository;
    }
    async createJobPost(userId, createJobPostDto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['auctioneer'],
        });
        if (!user || !user.auctioneer) {
            throw new common_1.UnauthorizedException('Only auctioneers can create job posts');
        }
        const jobPost = this.jobPostRepository.create(Object.assign(Object.assign({}, createJobPostDto), { auctioneer: user.auctioneer, status: 'active' }));
        return this.jobPostRepository.save(jobPost);
    }
    async getJobPostsByAuctioneer(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['auctioneer'],
        });
        if (!user || !user.auctioneer) {
            throw new common_1.UnauthorizedException('Only auctioneers can access this endpoint');
        }
        return this.jobPostRepository.find({
            where: { auctioneer: { id: user.auctioneer.id } },
            relations: ['auctioneer', 'bids', 'bids.bidder', 'bids.bidder.user'],
            order: { id: 'DESC' },
        });
    }
    async getJobPostsByBidder(userId) {
        const bidder = await this.bidderRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        });
        if (!bidder) {
            throw new common_1.UnauthorizedException('Only bidders can access this endpoint');
        }
        return this.jobPostRepository
            .createQueryBuilder('jobPost')
            .leftJoinAndSelect('jobPost.auctioneer', 'auctioneer')
            .leftJoinAndSelect('auctioneer.user', 'auctioneerUser')
            .leftJoinAndSelect('jobPost.bids', 'bids')
            .leftJoinAndSelect('bids.bidder', 'bidder')
            .leftJoinAndSelect('bidder.user', 'bidderUser')
            .where((qb) => {
            const subQuery = qb
                .subQuery()
                .select('1')
                .from('bid', 'b')
                .where('b.job_post_id = jobPost.id')
                .andWhere('b.bidder_id = :bidderId')
                .getQuery();
            return 'EXISTS ' + subQuery;
        })
            .setParameter('bidderId', bidder.id)
            .orderBy('jobPost.id', 'DESC')
            .getMany();
    }
    async getJobPostsForBidder(userId, filterDto) {
        const bidder = await this.bidderRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        });
        if (!bidder) {
            throw new common_1.UnauthorizedException('Only bidders can access this endpoint');
        }
        if (!bidder.latitude || !bidder.longitude) {
            throw new common_1.BadRequestException('Bidder location not set');
        }
        const radius = filterDto.radius || 7;
        let query = this.jobPostRepository
            .createQueryBuilder('jobPost')
            .leftJoinAndSelect('jobPost.auctioneer', 'auctioneer')
            .leftJoinAndSelect('jobPost.bids', 'bids')
            .leftJoinAndSelect('bids.bidder', 'bidder')
            .where('NOT EXISTS (SELECT 1 FROM bid WHERE bid.job_post_id = jobPost.id AND bid.bidder_id = :bidderId)', { bidderId: bidder.id });
        query = query.andWhere(`(
        6371 * acos(
          cos(radians(:latitude)) * 
          cos(radians(ST_X(jobPost.location::geometry))) * 
          cos(radians(ST_Y(jobPost.location::geometry)) - radians(:longitude)) + 
          sin(radians(:latitude)) * 
          sin(radians(ST_X(jobPost.location::geometry)))
        )
      ) <= :radius`, {
            latitude: bidder.latitude,
            longitude: bidder.longitude,
            radius,
        });
        if (filterDto.boatLengthFrom !== undefined) {
            query = query.andWhere('jobPost.boatLength >= :boatLengthFrom', {
                boatLengthFrom: filterDto.boatLengthFrom,
            });
        }
        if (filterDto.boatLengthTo !== undefined) {
            query = query.andWhere('jobPost.boatLength <= :boatLengthTo', {
                boatLengthTo: filterDto.boatLengthTo,
            });
        }
        if (filterDto.additionalServices) {
            const services = filterDto.additionalServices.split(',').map(s => s.trim());
            if (services.length > 0) {
                query = query.andWhere('jobPost.additionalServices @> :services', {
                    services,
                });
            }
        }
        return query.getMany();
    }
    async getAllJobPosts(page, limit) {
        const [data, total] = await this.jobPostRepository.findAndCount({
            relations: ['auctioneer', 'auctioneer.user', 'bids', 'bids.bidder'],
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'DESC' },
        });
        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
};
exports.JobPostsService = JobPostsService;
exports.JobPostsService = JobPostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_post_entity_1.JobPost)),
    __param(1, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JobPostsService);
//# sourceMappingURL=job-posts.service.js.map