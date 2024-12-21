import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee, User } from '@/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, User])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
