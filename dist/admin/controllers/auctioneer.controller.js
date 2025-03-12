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
exports.AuctioneerController = void 0;
const common_1 = require("@nestjs/common");
const auctioneer_service_1 = require("../services/auctioneer.service");
const admin_auth_guard_1 = require("../guards/admin-auth.guard");
const create_auctioneer_dto_1 = require("../dto/create-auctioneer.dto");
let AuctioneerController = class AuctioneerController {
    constructor(auctioneerService) {
        this.auctioneerService = auctioneerService;
    }
    async getAll() {
        const auctioneers = await this.auctioneerService.findAll();
        return { auctioneers };
    }
    getCreateForm() {
        return { auctioneer: null };
    }
    async create(createAuctioneerDto) {
        return this.auctioneerService.create(createAuctioneerDto);
    }
    async getOne(id) {
        const auctioneer = await this.auctioneerService.findOne(id);
        return { auctioneer };
    }
    async update(id, updateAuctioneerDto) {
        return this.auctioneerService.update(id, updateAuctioneerDto);
    }
    async remove(id) {
        return this.auctioneerService.remove(id);
    }
};
exports.AuctioneerController = AuctioneerController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('admin/auctioneer/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuctioneerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('new'),
    (0, common_1.Render)('admin/auctioneer/form'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuctioneerController.prototype, "getCreateForm", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auctioneer_dto_1.CreateAuctioneerDto]),
    __metadata("design:returntype", Promise)
], AuctioneerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('admin/auctioneer/form'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuctioneerController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_auctioneer_dto_1.CreateAuctioneerDto]),
    __metadata("design:returntype", Promise)
], AuctioneerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuctioneerController.prototype, "remove", null);
exports.AuctioneerController = AuctioneerController = __decorate([
    (0, common_1.Controller)('admin/auctioneer'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __metadata("design:paramtypes", [auctioneer_service_1.AuctioneerService])
], AuctioneerController);
//# sourceMappingURL=auctioneer.controller.js.map