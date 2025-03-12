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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bidder_entity_1 = require("../entities/bidder.entity");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(userRepository, bidderRepository, jwtService) {
        this.userRepository = userRepository;
        this.bidderRepository = bidderRepository;
        this.jwtService = jwtService;
    }
    hashPassword(password) {
        return (0, crypto_1.createHash)('sha256').update(password).digest('hex');
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['bidder']
        });
        if (user && this.hashPassword(password) === user.password) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                user_type: user.user_type,
                has_bidder_profile: !!user.bidder
            },
        };
    }
    async register(registerDto) {
        const hashedPassword = this.hashPassword(registerDto.password);
        const user = this.userRepository.create({
            email: registerDto.email,
            password: hashedPassword,
            first_name: registerDto.first_name,
            last_name: registerDto.last_name,
            user_type: registerDto.user_type,
        });
        const savedUser = await this.userRepository.save(user);
        const { password } = savedUser, result = __rest(savedUser, ["password"]);
        return result;
    }
    async requestResetPassword(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        return {
            success: true,
            message: 'Password reset instructions have been sent to your email'
        };
    }
    async resetPassword(token, newPassword) {
        return {
            success: false,
            message: 'Password reset functionality is not implemented'
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(bidder_entity_1.Bidder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map