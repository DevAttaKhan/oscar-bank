import { User } from '@/database/entities/user.entity';
import { IUserFlattenedPermissions } from '../interfaces/user.interface';

export function mergePermissions(user: User): IUserFlattenedPermissions {
  // Extract all permission names from all groups
  const permissions = user.groups.flatMap((group: any) =>
    group.permissions.map((permission: any) => permission.name),
  );
  // Remove duplicates by converting to a Set and back to an array
  const uniquePermissions = Array.from(new Set(permissions));
  // Return a new user object with `permissions` array and without `groups`
  const userWithMergedPermissions = {
    ...user,
    permissions: uniquePermissions,
  };

  delete userWithMergedPermissions?.groups;

  return userWithMergedPermissions;
}
