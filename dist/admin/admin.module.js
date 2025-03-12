"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../entities/user.entity");
const auctioneer_entity_1 = require("../entities/auctioneer.entity");
const bidder_entity_1 = require("../entities/bidder.entity");
const job_post_entity_1 = require("../entities/job-post.entity");
const admin_controller_1 = require("./controllers/admin.controller");
const auctioneer_controller_1 = require("./controllers/auctioneer.controller");
const bidder_controller_1 = require("./controllers/bidder.controller");
const job_post_admin_controller_1 = require("./controllers/job-post.admin.controller");
const admin_service_1 = require("./services/admin.service");
const auctioneer_service_1 = require("./services/auctioneer.service");
const bidder_service_1 = require("./services/bidder.service");
const job_post_admin_service_1 = require("./services/job-post.admin.service");
const admin_middleware_1 = require("./middleware/admin.middleware");
let AdminModule = class AdminModule {
    configure(consumer) {
        consumer
            .apply(admin_middleware_1.AdminMiddleware)
            .exclude('admin/login')
            .forRoutes('*');
    }
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, auctioneer_entity_1.Auctioneer, bidder_entity_1.Bidder, job_post_entity_1.JobPost]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key',
                signOptions: { expiresIn: '1d' },
            }),
        ],
        controllers: [
            admin_controller_1.AdminController,
            auctioneer_controller_1.AuctioneerController,
            bidder_controller_1.BidderAdminController,
            job_post_admin_controller_1.JobPostAdminController,
        ],
        providers: [
            admin_service_1.AdminService,
            auctioneer_service_1.AuctioneerService,
            bidder_service_1.BidderAdminService,
            job_post_admin_service_1.JobPostAdminService,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map