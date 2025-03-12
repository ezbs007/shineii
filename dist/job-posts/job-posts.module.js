"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_post_entity_1 = require("../entities/job-post.entity");
const bidder_entity_1 = require("../entities/bidder.entity");
const user_entity_1 = require("../entities/user.entity");
const job_post_controller_1 = require("./controllers/job-post.controller");
const job_post_service_1 = require("./services/job-post.service");
const job_post_query_service_1 = require("./services/job-post-query.service");
const job_post_query_builder_1 = require("./services/job-post-query.builder");
let JobPostsModule = class JobPostsModule {
};
exports.JobPostsModule = JobPostsModule;
exports.JobPostsModule = JobPostsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([job_post_entity_1.JobPost, bidder_entity_1.Bidder, user_entity_1.User])],
        controllers: [job_post_controller_1.JobPostController],
        providers: [job_post_service_1.JobPostService, job_post_query_service_1.JobPostQueryService, job_post_query_builder_1.JobPostQueryBuilder],
    })
], JobPostsModule);
//# sourceMappingURL=job-posts.module.js.map