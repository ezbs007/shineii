"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jobs_controller_1 = require("./jobs.controller");
const jobs_service_1 = require("./jobs.service");
const job_entity_1 = require("../entities/job.entity");
const bid_entity_1 = require("../entities/bid.entity");
const user_entity_1 = require("../entities/user.entity");
const job_post_entity_1 = require("../entities/job-post.entity");
let JobsModule = class JobsModule {
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([job_entity_1.Job, bid_entity_1.Bid, user_entity_1.User, job_post_entity_1.JobPost])],
        controllers: [jobs_controller_1.JobsController],
        providers: [jobs_service_1.JobsService],
    })
], JobsModule);
//# sourceMappingURL=jobs.module.js.map