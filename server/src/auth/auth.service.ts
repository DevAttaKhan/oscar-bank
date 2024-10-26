import { IUserFlattenedPermissions } from '@/common/interfaces/user.interface';
import { mergePermissions } from '@/common/util/common.util';
import { UserService } from '@/user/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigType } from '@nestjs/config';
import { jwtRefresh } from './config/refresh-jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(jwtRefresh.KEY) private jwtRefreshConfig: ConfigType<typeof jwtRefresh>,
  ) {}

  async validateUser(email: string, password: string) {
    // find user if registered in db
    const user = await this.userService.findByEmail(email, ['groups', 'groups.permissions']);
    // if not trow 401 exception
    if (!user) throw new UnauthorizedException('user not found');

    // if user found then match password
    const isPasswordMatched = await compare(password, user.password);
    // if password do not matches throw 401 exception
    if (!isPasswordMatched) throw new UnauthorizedException('invalid credentials');

    return mergePermissions(user);
  }

  async login(user: IUserFlattenedPermissions) {
    const { token, refreshToken } = await this.generateTokens(user);

    return {
      token,
      refreshToken,
      user,
    };
  }

  async generateTokens(user: IUserFlattenedPermissions) {
    const payload = {
      sub: {
        id: user.id,
        email: user.email,
        username: user.username,
        phone: user.phone,
      },
    };
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.jwtRefreshConfig),
    ]);
    return {
      token,
      refreshToken,
    };
  }
}
