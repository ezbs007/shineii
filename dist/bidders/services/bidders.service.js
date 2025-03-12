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
exports.BiddersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bidder_entity_1 = require("../../entities/bidder.entity");
const user_entity_1 = require("../../entities/user.entity");
let BiddersService = class BiddersService {
    constructor(bidderRepository, userRepository) {
        this.bidderRepository = bidderRepository;
        this.userRepository = userRepository;
    }
    async create(userId, createBidderDto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['bidder'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.user_type !== 'bidder') {
            throw new common_1.UnauthorizedException('Only bidders can create bidder profiles');
        }
        if (user.bidder) {
            throw new common_1.BadRequestException('Bidder profile already exists');
        }
        const bidder = this.bidderRepository.create(Object.assign(Object.assign({}, createBidderDto), { user }));
        return this.bidderRepository.save(bidder);
    }
    async update(userId, updateBidderDto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['bidder'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.user_type !== 'bidder') {
            throw new common_1.UnauthorizedException('Only bidders can update bidder profiles');
        }
        if (!user.bidder) {
            throw new common_1.BadRequestException('Bidder profile not found');
        }
        Object.assign(user.bidder, updateBidderDto);
        return this.bidderRepository.save(user.bidder);
    }
};
exports.BiddersService = BiddersService;
exports.BiddersService = BiddersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BiddersService);
//# sourceMappingURL=bidders.service.js.map