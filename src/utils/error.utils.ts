import { UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';

export class ErrorUtils {
  static getErrorCode(error: Error): string {
    if (error instanceof UnauthorizedException) {
      return 'UNAUTHORIZED';
    }
    if (error instanceof NotFoundException) {
      return 'NOT_FOUND';
    }
    if (error instanceof BadRequestException) {
      return 'BAD_REQUEST';
    }
    return 'INTERNAL_ERROR';
  }

  static getErrorMessage(error: Error): string {
    return error.message || 'An unexpected error occurred';
  }

  static createErrorResponse(error: Error) {
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