import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class RefreshJwtGuard extends AuthGuard('refresh-jwt') {
  constructor() {
    super();
  }
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    if (err || !user) {
      throw new ForbiddenException('Refresh token expired');
    }
    return user;
  }
}
