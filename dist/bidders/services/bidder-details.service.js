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
exports.BidderDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bidder_entity_1 = require("../../entities/bidder.entity");
const user_entity_1 = require("../../entities/user.entity");
const error_utils_1 = require("../utils/error.utils");
let BidderDetailsService = class BidderDetailsService {
    constructor(bidderRepository, userRepository) {
        this.bidderRepository = bidderRepository;
        this.userRepository = userRepository;
    }
    async getBidderDetails(userId) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['bidder'],
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            if (user.user_type !== 'bidder') {
                throw new common_1.UnauthorizedException('User is not a bidder');
            }
            if (!user.bidder) {
                throw new common_1.NotFoundException('Bidder profile not found');
            }
            return {
                success: true,
                message: 'Bidder details retrieved successfully',
                data: {
                    id: user.bidder.id,
                    title: user.bidder.title,
                    bio_description: user.bidder.bio_discription,
                    contact_number: user.bidder.contact_number,
                    address: user.bidder.address,
                    latitude: user.bidder.latitude,
                    longitude: user.bidder.longitude,
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
                    code: error_utils_1.ErrorUtils.getErrorCode(error),
                    details: error.message,
                },
            };
        }
    }
};
exports.BidderDetailsService = BidderDetailsService;
exports.BidderDetailsService = BidderDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BidderDetailsService);
//# sourceMappingURL=bidder-details.service.js.map