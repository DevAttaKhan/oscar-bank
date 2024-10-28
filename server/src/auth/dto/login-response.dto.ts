import { Exclude, Expose, Type } from 'class-transformer';
class User {
  @Expose()
  id: number;

  @Expose()
  username: any;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  phone: string;

  @Expose()
  userType: any;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  cnic: string;

  @Expose()
  dateOfBirth: any;

  @Expose()
  address: any;

  @Expose()
  status: string;

  @Expose()
  profileImageUrl: any;

  @Expose()
  isEmailVerified: boolean;

  @Expose()
  isPhoneVerified: boolean;

  @Expose()
  twoFactorEnabled: boolean;

  securityQuestions: any;

  preferredLanguage: string;

  timezone: any;

  lastPasswordChange: any;

  resetPasswordToken: any;

  failedLoginAttempts: number;

  lockedUntil: any;

  userGroupId: any;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  deletedAt: any;

  lastLogin: any;

  @Expose()
  permissions: string[];
}

export class LoginResponseDto {
  @Expose()
  token: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => User)
  user: User;
}
