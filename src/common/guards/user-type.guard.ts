import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserTypes = this.reflector.get<string[]>('userTypes', context.getHandler());
    if (!requiredUserTypes) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredUserTypes.includes(user.user_type);
  }
}