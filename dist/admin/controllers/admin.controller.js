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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../services/admin.service");
const admin_auth_guard_1 = require("../guards/admin-auth.guard");
const login_dto_1 = require("../dto/login.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    getLogin() {
        return { message: '' };
    }
    async postLogin(loginDto, res) {
        try {
            const result = await this.adminService.validateAdmin(loginDto);
            if (result && result.token) {
                res.cookie('admin_token', result.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60 * 1000
                });
                return res.redirect('/admin/dashboard');
            }
            return res.render('admin/login', { message: 'Invalid credentials' });
        }
        catch (error) {
            return res.render('admin/login', { message: 'Login failed' });
        }
    }
    async getDashboard() {
        const stats = await this.adminService.getDashboardStats();
        return { stats };
    }
    async logout(res) {
        res.clearCookie('admin_token');
        return res.redirect('/admin/login');
    }
    notFound() {
        throw new common_1.NotFoundException();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Render)('admin/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getLogin", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "postLogin", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Render)('admin/dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('*'),
    (0, common_1.Render)('admin/404'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "notFound", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map