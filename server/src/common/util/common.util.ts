import { User } from '@/database/entities/user.entity';
import { IUserFlattenedPermissions } from '../interfaces/user.interface';
import { ILike } from 'typeorm';

import { customAlphabet } from 'nanoid';

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

export const mapFieldsToSearchFilters = (search: string, fields: string[]) => {
  return fields.reduce((acc, field) => {
    const [relation, subField] = field.split('.');

    if (subField) {
      acc[relation] = acc[relation] || {};
      acc[relation][subField] = ILike(`%${search}%`);
    } else {
      acc[field] = ILike(`%${search}%`);
    }

    return acc;
  }, {});
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Uppercase and digits only

export const generatedUniqueEmployeecode = () => {
  const generateCode = customAlphabet(alphabet, 6);

  return generateCode();
};
