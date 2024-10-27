import { ForbiddenException, Inject, Injectable, UseFilters } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { jwtRefresh } from '../config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(jwtRefresh.KEY)
    private jwtRefreshConfig: ConfigType<typeof jwtRefresh>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh-token'),
      secretOrKey: jwtRefreshConfig.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    } as StrategyOptions);
  }

  validate(req, payload) {
    try {
      // Your validation logic
      return payload.sub;
    } catch (error) {
      // Customize the error response here
      throw new ForbiddenException('Custom message: Refresh token verification failed');
    }
  }
}
