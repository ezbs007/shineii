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
exports.AuctioneerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auctioneer_entity_1 = require("../../entities/auctioneer.entity");
const user_entity_1 = require("../../entities/user.entity");
const crypto_1 = require("crypto");
let AuctioneerService = class AuctioneerService {
    constructor(auctioneerRepository, userRepository) {
        this.auctioneerRepository = auctioneerRepository;
        this.userRepository = userRepository;
    }
    hashPassword(password) {
        return (0, crypto_1.createHash)('sha256').update(password).digest('hex');
    }
    async findAll() {
        return this.auctioneerRepository.find({
            relations: ['user'],
        });
    }
    async findOne(id) {
        const auctioneer = await this.auctioneerRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!auctioneer) {
            throw new common_1.NotFoundException('Auctioneer not found');
        }
        return auctioneer;
    }
    async create(createAuctioneerDto) {
        const hashedPassword = this.hashPassword(createAuctioneerDto.password);
        const user = this.userRepository.create({
            email: createAuctioneerDto.email,
            password: hashedPassword,
            first_name: createAuctioneerDto.first_name,
            last_name: createAuctioneerDto.last_name,
            user_type: 'auctioneer',
        });
        const savedUser = await this.userRepository.save(user);
        const auctioneer = this.auctioneerRepository.create({
            company_name: createAuctioneerDto.company_name,
            contact_number: createAuctioneerDto.contact_number,
            address: createAuctioneerDto.address,
            user: savedUser,
        });
        return this.auctioneerRepository.save(auctioneer);
    }
    async update(id, updateAuctioneerDto) {
        const auctioneer = await this.findOne(id);
        Object.assign(auctioneer, {
            company_name: updateAuctioneerDto.company_name,
            contact_number: updateAuctioneerDto.contact_number,
            address: updateAuctioneerDto.address,
        });
        if (updateAuctioneerDto.password) {
            const hashedPassword = this.hashPassword(updateAuctioneerDto.password);
            await this.userRepository.update(auctioneer.user.id, {
                password: hashedPassword,
            });
        }
        return this.auctioneerRepository.save(auctioneer);
    }
    async remove(id) {
        const auctioneer = await this.findOne(id);
        await this.userRepository.remove(auctioneer.user);
        return this.auctioneerRepository.remove(auctioneer);
    }
};
exports.AuctioneerService = AuctioneerService;
exports.AuctioneerService = AuctioneerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auctioneer_entity_1.Auctioneer)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuctioneerService);
//# sourceMappingURL=auctioneer.service.js.map