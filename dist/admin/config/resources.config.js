"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourcesConfig = void 0;
const user_entity_1 = require("../../entities/user.entity");
const auctioneer_entity_1 = require("../../entities/auctioneer.entity");
exports.resourcesConfig = [
    {
        resource: user_entity_1.User,
        options: {
            listProperties: ['id', 'email', 'first_name', 'last_name', 'user_type'],
            filterProperties: ['email', 'user_type'],
            editProperties: ['email', 'first_name', 'last_name', 'user_type'],
            showProperties: ['id', 'email', 'first_name', 'last_name', 'user_type', 'createdAt'],
        },
    },
    {
        resource: auctioneer_entity_1.Auctioneer,
        options: {
            listProperties: ['id', 'company_name', 'contact_number', 'address'],
            filterProperties: ['company_name', 'contact_number'],
            editProperties: ['company_name', 'contact_number', 'address', 'user'],
            showProperties: ['id', 'company_name', 'contact_number', 'address', 'user'],
        },
    },
];
//# sourceMappingURL=resources.config.js.map