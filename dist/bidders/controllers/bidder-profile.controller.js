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
exports.BidderProfileController = void 0;
const common_1 = require("@nestjs/common");
const bidder_profile_service_1 = require("../services/bidder-profile.service");
const bidder_dto_1 = require("../dto/bidder.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const user_type_guard_1 = require("../../common/guards/user-type.guard");
const user_decorator_1 = require("../../common/decorators/user.decorator");
let BidderProfileController = class BidderProfileController {
    constructor(bidderProfileService) {
        this.bidderProfileService = bidderProfileService;
    }
    async create(user, createBidderDto) {
        return this.bidderProfileService.create(user.userId, createBidderDto);
    }
    async update(user, updateBidderDto) {
        return this.bidderProfileService.update(user.userId, updateBidderDto);
    }
    async getDetails(user) {
        return this.bidderProfileService.getDetails(user.userId);
    }
};
exports.BidderProfileController = BidderProfileController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bidder_dto_1.CreateBidderDto]),
    __metadata("design:returntype", Promise)
], BidderProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bidder_dto_1.UpdateBidderDto]),
    __metadata("design:returntype", Promise)
], BidderProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BidderProfileController.prototype, "getDetails", null);
exports.BidderProfileController = BidderProfileController = __decorate([
    (0, common_1.Controller)('bidders/profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_type_guard_1.UserTypeGuard),
    __metadata("design:paramtypes", [bidder_profile_service_1.BidderProfileService])
], BidderProfileController);
//# sourceMappingURL=bidder-profile.controller.js.map