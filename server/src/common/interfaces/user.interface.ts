import { User } from '@/database/entities/user.entity';

export interface IUserFlattenedPermissions extends Omit<User, 'groups' | 'hashPassword'> {
  permissions: string[];
}
