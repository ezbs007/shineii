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
exports.JobPostQueryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_post_entity_1 = require("../../entities/job-post.entity");
const bidder_entity_1 = require("../../entities/bidder.entity");
const job_post_query_builder_1 = require("./job-post-query.builder");
let JobPostQueryService = class JobPostQueryService {
    constructor(jobPostRepository, bidderRepository) {
        this.jobPostRepository = jobPostRepository;
        this.bidderRepository = bidderRepository;
    }
    async getJobPostsForBidder(userId, filterDto) {
        const bidder = await this.bidderRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        });
        if (!(bidder === null || bidder === void 0 ? void 0 : bidder.latitude) || !(bidder === null || bidder === void 0 ? void 0 : bidder.longitude)) {
            throw new common_1.BadRequestException('Bidder location not set');
        }
        const radius = filterDto.radius || 7;
        let query = job_post_query_builder_1.JobPostQueryBuilder.createBaseQuery(this.jobPostRepository);
        query = job_post_query_builder_1.JobPostQueryBuilder.applyLocationFilter(query, bidder, radius);
        query = job_post_query_builder_1.JobPostQueryBuilder.applyBoatLengthFilter(query, filterDto);
        if (filterDto.additionalServices) {
            const services = filterDto.additionalServices.split(',').map(s => s.trim());
            query = job_post_query_builder_1.JobPostQueryBuilder.applyServicesFilter(query, services);
        }
        query = job_post_query_builder_1.JobPostQueryBuilder.addDistanceOrdering(query, bidder);
        return query.getMany();
    }
};
exports.JobPostQueryService = JobPostQueryService;
exports.JobPostQueryService = JobPostQueryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_post_entity_1.JobPost)),
    __param(1, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JobPostQueryService);
//# sourceMappingURL=job-post-query.service.js.map