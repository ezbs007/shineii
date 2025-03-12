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
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const jobs_service_1 = require("./jobs.service");
const create_job_dto_1 = require("./dto/create-job.dto");
const calendar_jobs_dto_1 = require("./dto/calendar-jobs.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let JobsController = class JobsController {
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async createFromBid(req, createJobFromBidDto) {
        return this.jobsService.createFromBid(req.user.userId, createJobFromBidDto.bidId);
    }
    async getAuctioneerJobs(req, pagination) {
        return this.jobsService.getAuctioneerJobs(req.user.userId, pagination);
    }
    async getBidderJobs(req, pagination) {
        return this.jobsService.getBidderJobs(req.user.userId, pagination);
    }
    async getJobDetails(req, id) {
        return this.jobsService.getJobDetails(req.user.userId, id);
    }
    async getCalendarJobs(req, calendarJobsDto) {
        return this.jobsService.getCalendarJobs(req.user.userId, calendarJobsDto);
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)('from-bid'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_job_dto_1.CreateJobFromBidDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "createFromBid", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getAuctioneerJobs", null);
__decorate([
    (0, common_1.Get)('my-jobs'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getBidderJobs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobDetails", null);
__decorate([
    (0, common_1.Get)('calendar'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, calendar_jobs_dto_1.CalendarJobsDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getCalendarJobs", null);
exports.JobsController = JobsController = __decorate([
    (0, common_1.Controller)('jobs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map