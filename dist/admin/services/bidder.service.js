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
exports.BidderAdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bidder_entity_1 = require("../../entities/bidder.entity");
const user_entity_1 = require("../../entities/user.entity");
const crypto_1 = require("crypto");
let BidderAdminService = class BidderAdminService {
    constructor(bidderRepository, userRepository) {
        this.bidderRepository = bidderRepository;
        this.userRepository = userRepository;
    }
    hashPassword(password) {
        return (0, crypto_1.createHash)('sha256').update(password).digest('hex');
    }
    async findAll() {
        return this.bidderRepository.find({
            relations: ['user'],
        });
    }
    async findOne(id) {
        const bidder = await this.bidderRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!bidder) {
            throw new common_1.NotFoundException('Bidder not found');
        }
        return bidder;
    }
    async create(createBidderDto) {
        const hashedPassword = this.hashPassword(createBidderDto.password);
        const user = this.userRepository.create({
            email: createBidderDto.email,
            password: hashedPassword,
            first_name: createBidderDto.first_name,
            last_name: createBidderDto.last_name,
            user_type: 'bidder',
        });
        const savedUser = await this.userRepository.save(user);
        const bidder = this.bidderRepository.create({
            title: createBidderDto.title,
            bio_discription: createBidderDto.bio_discription,
            contact_number: createBidderDto.contact_number,
            address: createBidderDto.address,
            user: savedUser,
        });
        return this.bidderRepository.save(bidder);
    }
    async update(id, updateBidderDto) {
        const bidder = await this.findOne(id);
        if (updateBidderDto.password) {
            const hashedPassword = this.hashPassword(updateBidderDto.password);
            await this.userRepository.update(bidder.user.id, {
                password: hashedPassword,
            });
        }
        Object.assign(bidder, {
            title: updateBidderDto.title,
            bio_discription: updateBidderDto.bio_discription,
            contact_number: updateBidderDto.contact_number,
            address: updateBidderDto.address,
        });
        return this.bidderRepository.save(bidder);
    }
    async remove(id) {
        const bidder = await this.findOne(id);
        await this.userRepository.remove(bidder.user);
        return this.bidderRepository.remove(bidder);
    }
    async count() {
        return this.bidderRepository.count();
    }
};
exports.BidderAdminService = BidderAdminService;
exports.BidderAdminService = BidderAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BidderAdminService);
//# sourceMappingURL=bidder.service.js.map