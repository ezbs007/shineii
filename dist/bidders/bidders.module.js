"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiddersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bidder_profile_controller_1 = require("./controllers/bidder-profile.controller");
const bidder_profile_service_1 = require("./services/bidder-profile.service");
const bidder_entity_1 = require("../entities/bidder.entity");
const user_entity_1 = require("../entities/user.entity");
let BiddersModule = class BiddersModule {
};
exports.BiddersModule = BiddersModule;
exports.BiddersModule = BiddersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bidder_entity_1.Bidder, user_entity_1.User])],
        controllers: [bidder_profile_controller_1.BidderProfileController],
        providers: [bidder_profile_service_1.BidderProfileService],
    })
], BiddersModule);
//# sourceMappingURL=bidders.module.js.map