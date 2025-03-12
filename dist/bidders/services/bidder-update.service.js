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
exports.BidderUpdateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bidder_entity_1 = require("../../entities/bidder.entity");
const user_entity_1 = require("../../entities/user.entity");
const location_validator_1 = require("../validators/location.validator");
let BidderUpdateService = class BidderUpdateService {
    constructor(bidderRepository, userRepository) {
        this.bidderRepository = bidderRepository;
        this.userRepository = userRepository;
    }
    async update(userId, updateBidderDto) {
        try {
            const user = await this.validateUserAndPermissions(userId);
            location_validator_1.LocationValidator.validate(updateBidderDto.latitude, updateBidderDto.longitude);
            const bidder = await this.bidderRepository.findOne({
                where: { user: { id: userId } },
                relations: ['user'],
            });
            if (!bidder) {
                throw new common_1.NotFoundException('Bidder profile not found');
            }
            Object.assign(bidder, updateBidderDto);
            const updatedBidder = await this.bidderRepository.save(bidder);
            return {
                success: true,
                message: 'Bidder profile updated successfully',
                data: {
                    id: updatedBidder.id,
                    title: updatedBidder.title,
                    bio_description: updatedBidder.bio_discription,
                    contact_number: updatedBidder.contact_number,
                    address: updatedBidder.address,
                    latitude: updatedBidder.latitude,
                    longitude: updatedBidder.longitude,
                    user: {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                    },
                },
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
                error: {
                    code: this.getErrorCode(error),
                    details: error.message,
                },
            };
        }
    }
    async validateUserAndPermissions(userId) {
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
            throw new common_1.NotFoundException('Bidder profile not found');
        }
        return user;
    }
    async updateBidderProfile(bidder, updateBidderDto) {
        Object.assign(bidder, updateBidderDto);
        return this.bidderRepository.save(bidder);
    }
    getErrorCode(error) {
        if (error instanceof common_1.UnauthorizedException) {
            return 'UNAUTHORIZED';
        }
        if (error instanceof common_1.NotFoundException) {
            return 'NOT_FOUND';
        }
        if (error instanceof common_1.BadRequestException) {
            return 'BAD_REQUEST';
        }
        return 'INTERNAL_ERROR';
    }
};
exports.BidderUpdateService = BidderUpdateService;
exports.BidderUpdateService = BidderUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BidderUpdateService);
//# sourceMappingURL=bidder-update.service.js.map