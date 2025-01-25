import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from '@/database/config/db.local.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { BranchModule } from './branch/branch.module';
import { GroupsModule } from './groups/groups.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DesignationModule } from './designation/designation.module';
import { EmployeesModule } from './employees/employees.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [dbConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    BranchModule,
    GroupsModule,
    PermissionsModule,
    DesignationModule,
    EmployeesModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
