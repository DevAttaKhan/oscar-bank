import { PERMISSIONS_KEY } from '@/common/decorators/permissions.decorator';
import { IUserFlattenedPermissions } from '@/common/interfaces/user.interface';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isAuthorized = await super.canActivate(context);
    if (!isAuthorized) throw new UnauthorizedException('user not authorized');
    const req = context.switchToHttp().getRequest();
    const user: IUserFlattenedPermissions = req.user;
    const ResourcePermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const canAccess = user.permissions.some((userPermission) => ResourcePermissions.includes(userPermission));
    return canAccess;
  }
}
