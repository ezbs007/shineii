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
exports.BiddersController = void 0;
const common_1 = require("@nestjs/common");
const bidders_service_1 = require("../services/bidders.service");
const bidder_update_service_1 = require("../services/bidder-update.service");
const bidder_details_service_1 = require("../services/bidder-details.service");
const create_bidder_dto_1 = require("../dto/create-bidder.dto");
const update_bidder_dto_1 = require("../dto/update-bidder.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let BiddersController = class BiddersController {
    constructor(biddersService, bidderUpdateService, bidderDetailsService) {
        this.biddersService = biddersService;
        this.bidderUpdateService = bidderUpdateService;
        this.bidderDetailsService = bidderDetailsService;
    }
    async create(req, createBidderDto) {
        return this.biddersService.create(req.user.userId, createBidderDto);
    }
    async update(req, updateBidderDto) {
        return this.bidderUpdateService.update(req.user.userId, updateBidderDto);
    }
    async getDetails(req) {
        return this.bidderDetailsService.getBidderDetails(req.user.userId);
    }
};
exports.BiddersController = BiddersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bidder_dto_1.CreateBidderDto]),
    __metadata("design:returntype", Promise)
], BiddersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_bidder_dto_1.UpdateBidderDto]),
    __metadata("design:returntype", Promise)
], BiddersController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BiddersController.prototype, "getDetails", null);
exports.BiddersController = BiddersController = __decorate([
    (0, common_1.Controller)('bidders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [bidders_service_1.BiddersService,
        bidder_update_service_1.BidderUpdateService,
        bidder_details_service_1.BidderDetailsService])
], BiddersController);
//# sourceMappingURL=bidders.controller.js.map