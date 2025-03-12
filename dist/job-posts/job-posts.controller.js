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
exports.JobPostsController = void 0;
const common_1 = require("@nestjs/common");
const job_posts_service_1 = require("./job-posts.service");
const create_job_post_dto_1 = require("./dto/create-job-post.dto");
const filter_job_posts_dto_1 = require("./dto/filter-job-posts.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let JobPostsController = class JobPostsController {
    constructor(jobPostsService) {
        this.jobPostsService = jobPostsService;
    }
    async createJobPost(req, createJobPostDto) {
        return this.jobPostsService.createJobPost(req.user.userId, createJobPostDto);
    }
    async getMyJobPosts(req) {
        return this.jobPostsService.getJobPostsByAuctioneer(req.user.userId);
    }
    async getMyBiddedPosts(req) {
        return this.jobPostsService.getJobPostsByBidder(req.user.userId);
    }
    async getNearbyJobPosts(req, filterDto) {
        return this.jobPostsService.getJobPostsForBidder(req.user.userId, filterDto);
    }
    async getAllJobPosts(paginationQuery) {
        const { page = 1, limit = 10 } = paginationQuery;
        return this.jobPostsService.getAllJobPosts(page, limit);
    }
};
exports.JobPostsController = JobPostsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_job_post_dto_1.CreateJobPostDto]),
    __metadata("design:returntype", Promise)
], JobPostsController.prototype, "createJobPost", null);
__decorate([
    (0, common_1.Get)('my-posts'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobPostsController.prototype, "getMyJobPosts", null);
__decorate([
    (0, common_1.Get)('my-bids'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobPostsController.prototype, "getMyBiddedPosts", null);
__decorate([
    (0, common_1.Get)('nearby'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_job_posts_dto_1.FilterJobPostsDto]),
    __metadata("design:returntype", Promise)
], JobPostsController.prototype, "getNearbyJobPosts", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], JobPostsController.prototype, "getAllJobPosts", null);
exports.JobPostsController = JobPostsController = __decorate([
    (0, common_1.Controller)('job-posts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [job_posts_service_1.JobPostsService])
], JobPostsController);
//# sourceMappingURL=job-posts.controller.js.map