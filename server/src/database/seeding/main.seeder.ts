import { faker } from '@faker-js/faker';

import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PermissionFactory } from './factories';
import { Permissions } from '@/common/constants/common.enum';
import { Permission } from '../entities/permission.entity';
import { permission } from 'process';

const permissionsArray = Object.values(Permissions);

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('seed started ....');
    const permissionRepo = dataSource.getRepository(Permission);
    const allPermissions = await permissionRepo.save(
      permissionsArray.map((permission) => ({ name: permission })),
    );
  }
}
