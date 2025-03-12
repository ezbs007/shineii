"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUtils = void 0;
const common_1 = require("@nestjs/common");
class ErrorUtils {
    static getErrorCode(error) {
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
}
exports.ErrorUtils = ErrorUtils;
//# sourceMappingURL=error.utils.js.map