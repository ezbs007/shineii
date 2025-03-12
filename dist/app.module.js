"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const job_posts_module_1 = require("./job-posts/job-posts.module");
const bidders_module_1 = require("./bidders/bidders.module");
const bids_module_1 = require("./bids/bids.module");
const admin_module_1 = require("./admin/admin.module");
const jobs_module_1 = require("./jobs/jobs.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const user_entity_1 = require("./entities/user.entity");
const site_settings_entity_1 = require("./entities/site-settings.entity");
const bidder_entity_1 = require("./entities/bidder.entity");
const auctioneer_entity_1 = require("./entities/auctioneer.entity");
const job_post_entity_1 = require("./entities/job-post.entity");
const bid_entity_1 = require("./entities/bid.entity");
const job_entity_1 = require("./entities/job.entity");
const chat_room_entity_1 = require("./entities/chat-room.entity");
const review_entity_1 = require("./entities/review.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT) || 5432,
                username: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'auction_db',
                entities: [
                    user_entity_1.User,
                    site_settings_entity_1.SiteSettings,
                    bidder_entity_1.Bidder,
                    auctioneer_entity_1.Auctioneer,
                    job_post_entity_1.JobPost,
                    bid_entity_1.Bid,
                    job_entity_1.Job,
                    chat_room_entity_1.ChatRoom,
                    review_entity_1.Review,
                ],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            job_posts_module_1.JobPostsModule,
            bidders_module_1.BiddersModule,
            bids_module_1.BidsModule,
            admin_module_1.AdminModule,
            jobs_module_1.JobsModule,
            dashboard_module_1.DashboardModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map