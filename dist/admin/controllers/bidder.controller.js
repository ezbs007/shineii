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
exports.BidderAdminController = void 0;
const common_1 = require("@nestjs/common");
const bidder_service_1 = require("../services/bidder.service");
const admin_auth_guard_1 = require("../guards/admin-auth.guard");
const create_bidder_dto_1 = require("../dto/create-bidder.dto");
const update_bidder_dto_1 = require("../dto/update-bidder.dto");
let BidderAdminController = class BidderAdminController {
    constructor(bidderService) {
        this.bidderService = bidderService;
    }
    async getAll() {
        const bidders = await this.bidderService.findAll();
        return { bidders };
    }
    getCreateForm() {
        return { bidder: null };
    }
    async create(createBidderDto) {
        return this.bidderService.create(createBidderDto);
    }
    async getOne(id) {
        const bidder = await this.bidderService.findOne(id);
        return { bidder };
    }
    async update(id, updateBidderDto) {
        return this.bidderService.update(id, updateBidderDto);
    }
    async remove(id) {
        return this.bidderService.remove(id);
    }
};
exports.BidderAdminController = BidderAdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('admin/bidder/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BidderAdminController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('new'),
    (0, common_1.Render)('admin/bidder/form'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BidderAdminController.prototype, "getCreateForm", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bidder_dto_1.CreateBidderDto]),
    __metadata("design:returntype", Promise)
], BidderAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('admin/bidder/form'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BidderAdminController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bidder_dto_1.UpdateBidderDto]),
    __metadata("design:returntype", Promise)
], BidderAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BidderAdminController.prototype, "remove", null);
exports.BidderAdminController = BidderAdminController = __decorate([
    (0, common_1.Controller)('admin/bidders'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __metadata("design:paramtypes", [bidder_service_1.BidderAdminService])
], BidderAdminController);
//# sourceMappingURL=bidder.controller.js.map