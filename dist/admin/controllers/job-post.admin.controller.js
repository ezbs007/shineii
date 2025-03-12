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
exports.JobPostAdminController = void 0;
const common_1 = require("@nestjs/common");
const job_post_admin_service_1 = require("../services/job-post.admin.service");
const admin_auth_guard_1 = require("../guards/admin-auth.guard");
const create_job_post_dto_1 = require("../dto/create-job-post.dto");
const update_job_post_dto_1 = require("../dto/update-job-post.dto");
let JobPostAdminController = class JobPostAdminController {
    constructor(jobPostService) {
        this.jobPostService = jobPostService;
    }
    async getAll() {
        const jobPosts = await this.jobPostService.findAll();
        return { jobPosts };
    }
    getCreateForm() {
        return { jobPost: null };
    }
    async create(createJobPostDto) {
        return this.jobPostService.create(createJobPostDto);
    }
    async getOne(id) {
        const jobPost = await this.jobPostService.findOne(id);
        return { jobPost };
    }
    async update(id, updateJobPostDto) {
        return this.jobPostService.update(id, updateJobPostDto);
    }
    async remove(id) {
        return this.jobPostService.remove(id);
    }
};
exports.JobPostAdminController = JobPostAdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('admin/job-post/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobPostAdminController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('new'),
    (0, common_1.Render)('admin/job-post/form'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobPostAdminController.prototype, "getCreateForm", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_post_dto_1.CreateJobPostDto]),
    __metadata("design:returntype", Promise)
], JobPostAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('admin/job-post/form'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobPostAdminController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_job_post_dto_1.UpdateJobPostDto]),
    __metadata("design:returntype", Promise)
], JobPostAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobPostAdminController.prototype, "remove", null);
exports.JobPostAdminController = JobPostAdminController = __decorate([
    (0, common_1.Controller)('admin/job-posts'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __metadata("design:paramtypes", [job_post_admin_service_1.JobPostAdminService])
], JobPostAdminController);
//# sourceMappingURL=job-post.admin.controller.js.map