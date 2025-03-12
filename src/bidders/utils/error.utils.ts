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
}