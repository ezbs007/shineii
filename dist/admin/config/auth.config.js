"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
};
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};
exports.authConfig = {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'secret',
};
//# sourceMappingURL=auth.config.js.map