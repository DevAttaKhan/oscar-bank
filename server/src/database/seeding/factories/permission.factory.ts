import { Permissions } from '@/common/constants/common.enum';
import { Permission } from '@/database/entities/permission.entity';

import { setSeederFactory } from 'typeorm-extension';

export const PermissionFactory = setSeederFactory(Permission, (Faker) => {
  const permission = new Permission();

  permission.name = Faker.helpers.enumValue(Permissions);

  return permission;
});
