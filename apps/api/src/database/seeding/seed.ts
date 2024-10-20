import 'module-alias/register';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import dbLocalConfig from '../config/db.local.config';
import { MainSeeder } from './main.seeder';
import { PermissionFactory } from './factories';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot({
  envFilePath: '.env',
});

const options: DataSourceOptions & SeederOptions = {
  ...dbLocalConfig(),
  factories: [PermissionFactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});
