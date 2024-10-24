import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbLocalConfig from './config/db.local.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: dbLocalConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
