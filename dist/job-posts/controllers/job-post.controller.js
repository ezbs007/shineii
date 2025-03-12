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
exports.JobPostController = void 0;
const common_1 = require("@nestjs/common");
const job_post_service_1 = require("../services/job-post.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../../common/decorators/user.decorator");
let JobPostController = class JobPostController {
    constructor(jobPostService) {
        this.jobPostService = jobPostService;
    }
    async getJobPostDetails(user, id) {
        return this.jobPostService.getJobPostDetails(user.userId, id);
    }
};
exports.JobPostController = JobPostController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], JobPostController.prototype, "getJobPostDetails", null);
exports.JobPostController = JobPostController = __decorate([
    (0, common_1.Controller)('job-posts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [job_post_service_1.JobPostService])
], JobPostController);
//# sourceMappingURL=job-post.controller.js.map