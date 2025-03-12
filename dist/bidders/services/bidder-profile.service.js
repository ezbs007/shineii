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
exports.BidderProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bidder_entity_1 = require("../../entities/bidder.entity");
const user_entity_1 = require("../../entities/user.entity");
const location_util_1 = require("../../common/utils/location.util");
const error_util_1 = require("../../common/utils/error.util");
let BidderProfileService = class BidderProfileService {
    constructor(bidderRepository, userRepository) {
        this.bidderRepository = bidderRepository;
        this.userRepository = userRepository;
    }
    async create(userId, createBidderDto) {
        try {
            const user = await this.validateUser(userId);
            location_util_1.LocationUtil.validateCoordinates(createBidderDto.latitude, createBidderDto.longitude);
            const bidder = this.bidderRepository.create(Object.assign(Object.assign({}, createBidderDto), { user }));
            const savedBidder = await this.bidderRepository.save(bidder);
            return this.formatBidderResponse(savedBidder, 'Bidder profile created successfully');
        }
        catch (error) {
            return error_util_1.ErrorUtil.createErrorResponse(error);
        }
    }
    async update(userId, updateBidderDto) {
        try {
            const user = await this.validateUser(userId);
            location_util_1.LocationUtil.validateCoordinates(updateBidderDto.latitude, updateBidderDto.longitude);
            const bidder = await this.bidderRepository.findOne({
                where: { user: { id: userId } },
                relations: ['user'],
            });
            if (!bidder) {
                throw new common_1.NotFoundException('Bidder profile not found');
            }
            Object.assign(bidder, updateBidderDto);
            const updatedBidder = await this.bidderRepository.save(bidder);
            return this.formatBidderResponse(updatedBidder, 'Bidder profile updated successfully');
        }
        catch (error) {
            return error_util_1.ErrorUtil.createErrorResponse(error);
        }
    }
    async getDetails(userId) {
        try {
            const user = await this.validateUser(userId);
            const bidder = await this.bidderRepository.findOne({
                where: { user: { id: userId } },
                relations: ['user'],
            });
            if (!bidder) {
                throw new common_1.NotFoundException('Bidder profile not found');
            }
            return this.formatBidderResponse(bidder, 'Bidder details retrieved successfully');
        }
        catch (error) {
            return error_util_1.ErrorUtil.createErrorResponse(error);
        }
    }
    async validateUser(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.user_type !== 'bidder') {
            throw new common_1.UnauthorizedException('User is not a bidder');
        }
        return user;
    }
    formatBidderResponse(bidder, message) {
        return {
            success: true,
            message,
            data: {
                id: bidder.id,
                title: bidder.title,
                bio_description: bidder.bio_discription,
                contact_number: bidder.contact_number,
                address: bidder.address,
                latitude: bidder.latitude,
                longitude: bidder.longitude,
                user: {
                    id: bidder.user.id,
                    email: bidder.user.email,
                    first_name: bidder.user.first_name,
                    last_name: bidder.user.last_name,
                },
            },
        };
    }
};
exports.BidderProfileService = BidderProfileService;
exports.BidderProfileService = BidderProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BidderProfileService);
//# sourceMappingURL=bidder-profile.service.js.map