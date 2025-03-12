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
exports.JobPostAdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_post_entity_1 = require("../../entities/job-post.entity");
let JobPostAdminService = class JobPostAdminService {
    constructor(jobPostRepository) {
        this.jobPostRepository = jobPostRepository;
    }
    async findAll() {
        return this.jobPostRepository.find({
            relations: ['auctioneer', 'auctioneer.user', 'bids'],
            order: { bid_end_date: 'DESC' }
        });
    }
    async findOne(id) {
        const jobPost = await this.jobPostRepository.findOne({
            where: { id },
            relations: ['auctioneer', 'auctioneer.user', 'bids', 'bids.bidder', 'bids.bidder.user']
        });
        if (!jobPost) {
            throw new common_1.NotFoundException('Job post not found');
        }
        return jobPost;
    }
    async create(createJobPostDto) {
        const jobPost = this.jobPostRepository.create(createJobPostDto);
        return this.jobPostRepository.save(jobPost);
    }
    async update(id, updateJobPostDto) {
        const jobPost = await this.findOne(id);
        Object.assign(jobPost, updateJobPostDto);
        return this.jobPostRepository.save(jobPost);
    }
    async remove(id) {
        const jobPost = await this.findOne(id);
        return this.jobPostRepository.remove(jobPost);
    }
    async count() {
        return this.jobPostRepository.count();
    }
};
exports.JobPostAdminService = JobPostAdminService;
exports.JobPostAdminService = JobPostAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_post_entity_1.JobPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobPostAdminService);
//# sourceMappingURL=job-post.admin.service.js.map