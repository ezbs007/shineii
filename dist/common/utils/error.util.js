"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUtil = void 0;
const common_1 = require("@nestjs/common");
class ErrorUtil {
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
    static getErrorMessage(error) {
        return error.message || 'An unexpected error occurred';
    }
    static createErrorResponse(error) {
        return {
            success: false,
            message: this.getErrorMessage(error),
            error: {
                code: this.getErrorCode(error),
                details: error.message,
            },
        };
    }
}
exports.ErrorUtil = ErrorUtil;
//# sourceMappingURL=error.util.js.map