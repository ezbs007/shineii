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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../../entities/user.entity");
const auctioneer_entity_1 = require("../../entities/auctioneer.entity");
const bidder_entity_1 = require("../../entities/bidder.entity");
const job_post_entity_1 = require("../../entities/job-post.entity");
const crypto_1 = require("crypto");
let AdminService = class AdminService {
    constructor(userRepository, auctioneerRepository, bidderRepository, jobPostRepository, jwtService) {
        this.userRepository = userRepository;
        this.auctioneerRepository = auctioneerRepository;
        this.bidderRepository = bidderRepository;
        this.jobPostRepository = jobPostRepository;
        this.jwtService = jwtService;
    }
    hashPassword(password) {
        return (0, crypto_1.createHash)('sha256').update(password).digest('hex');
    }
    async validateAdmin(loginDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email, user_type: 'admin' },
        });
        if (user && this.hashPassword(loginDto.password) === user.password) {
            const token = this.jwtService.sign({ sub: user.id, email: user.email });
            return { token };
        }
        throw new common_1.UnauthorizedException();
    }
    async getDashboardStats() {
        const [userCount, auctioneerCount, bidderCount, jobPostCount] = await Promise.all([
            this.userRepository.count(),
            this.auctioneerRepository.count(),
            this.bidderRepository.count(),
            this.jobPostRepository.count(),
        ]);
        return {
            users: userCount,
            auctioneers: auctioneerCount,
            bidders: bidderCount,
            jobPosts: jobPostCount,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(auctioneer_entity_1.Auctioneer)),
    __param(2, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __param(3, (0, typeorm_1.InjectRepository)(job_post_entity_1.JobPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map