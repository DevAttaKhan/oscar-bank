import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Permissions } from '@/common/constants/common.enum';
import { Permission } from '../entities/permission.entity';
import { Group } from '../entities/group.entity';

//converts Permissions enum to array of permission e.g ['user:read', 'user:create']
const permissionsArray = Object.values(Permissions);

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    console.log('seed started ....');
    const permissionRepo = dataSource.getRepository(Permission);
    const userRepo = dataSource.getRepository(User);
    const groupRepo = dataSource.getRepository(Group);
    // seed all permissions in the db
    const allPermissions = await permissionRepo.save(permissionsArray.map((permission) => ({ name: permission })));

    const savedGroup = await groupRepo.save({ name: 'super admin', description: 'this groupe have all the permissions', permissions: allPermissions });

    // create user model this will also hash password
    const createdSuperAdmin = userRepo.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@super.com',
      password: 'superadmin',
      phone: '03161217056',
      cnic: '1730162534839',
      groups: [savedGroup],
    });

    const savedSuperAdmin = await userRepo.save(createdSuperAdmin);
  }
}
