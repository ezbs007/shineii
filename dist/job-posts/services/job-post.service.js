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
exports.JobPostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_post_entity_1 = require("../../entities/job-post.entity");
const error_util_1 = require("../../common/utils/error.util");
const job_post_mapper_1 = require("../mappers/job-post.mapper");
let JobPostService = class JobPostService {
    constructor(jobPostRepository) {
        this.jobPostRepository = jobPostRepository;
    }
    async getJobPostDetails(userId, jobPostId) {
        try {
            const jobPost = await this.jobPostRepository.findOne({
                where: {
                    id: jobPostId,
                    auctioneer: { user: { id: userId } }
                },
                relations: [
                    'auctioneer',
                    'auctioneer.user',
                    'bids',
                    'bids.bidder',
                    'bids.bidder.user'
                ],
            });
            if (!jobPost) {
                throw new common_1.NotFoundException('Job post not found');
            }
            const mappedJobPost = job_post_mapper_1.JobPostMapper.toDTO(jobPost, userId);
            return {
                success: true,
                message: 'Job post details retrieved successfully',
                data: mappedJobPost
            };
        }
        catch (error) {
            return error_util_1.ErrorUtil.createErrorResponse(error);
        }
    }
};
exports.JobPostService = JobPostService;
exports.JobPostService = JobPostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_post_entity_1.JobPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobPostService);
//# sourceMappingURL=job-post.service.js.map