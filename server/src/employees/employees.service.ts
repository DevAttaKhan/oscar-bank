import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch, Designation, Employee, User } from '@/database/entities';
import { In, Repository } from 'typeorm';
import { PaginationOptions } from '@/common/interfaces/pagination.interface';
import { getPaginatedData } from '@/common/util/pagination.util';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    const queryRunner = this.employeeRepo.manager.connection.createQueryRunner();

    // Start the transaction
    await queryRunner.startTransaction();

    try {
      // Create and save the User first -
      // this dto have both user and employee date by creating user it will automatically save user related properties to the modal
      const user = this.userRepo.create(dto);
      await queryRunner.manager.save(user);

      const [branchResult, designationResult, supervisorResult] = await Promise.allSettled([
        queryRunner.manager.getRepository(Branch).findOneBy({ id: dto.assignedBranchId }),
        queryRunner.manager.getRepository(Designation).findOneBy({ id: dto.designationId }),
        queryRunner.manager.getRepository(Employee).findOneBy({ id: dto.supervisorId }),
      ]);

      const branch = branchResult.status === 'fulfilled' ? branchResult.value : null;
      const designation = designationResult.status === 'fulfilled' ? designationResult.value : null;
      const supervisor = supervisorResult.status === 'fulfilled' ? supervisorResult.value : null;

      const employee = this.employeeRepo.create({
        ...dto,
        assignedBranch: branch,
        designation: designation,
        supervisor: supervisor,
        user,
      });

      await queryRunner.manager.save(employee);

      // Commit the transaction
      await queryRunner.commitTransaction();

      return employee;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(options: PaginationOptions<Employee>) {
    return getPaginatedData(this.employeeRepo, options);
  }

  findOne(id: number) {
    return this.employeeRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    const queryRunner = this.employeeRepo.manager.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const existingEmployee = await queryRunner.manager.getRepository(Employee).findOne({
        where: { id },
        relations: ['user'],
      });

      if (!existingEmployee) {
        throw new Error('Employee not found');
      }

      const existingUser = await queryRunner.manager
        .getRepository(User)
        .findOneBy({ id: existingEmployee.user.id });

      if (!existingUser) {
        throw new Error('User not found');
      }

      const updatedUser = this.userRepo.create({ ...existingEmployee.user, ...dto });
      await queryRunner.manager.getRepository(User).save(updatedUser);
      const updatedEmployee = this.employeeRepo.create({ ...existingEmployee, ...dto });
      updatedEmployee.user = updatedUser;

      const employee = await queryRunner.manager.getRepository(Employee).save(updatedEmployee);
      await queryRunner.commitTransaction();
      return employee;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      queryRunner.release();
    }
  }

  async remove(ids: number[]) {
    const queryRunner = this.employeeRepo.manager.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const employees = await queryRunner.manager.getRepository(Employee).find({
        where: { id: In(ids) },
        relations: ['user'], // Ensure the related user is loaded
      });

      if (employees.length === 0) {
        throw new NotFoundException('No employees found to delete');
      }

      employees.forEach(async (el) => {
        await queryRunner.manager.getRepository(User).delete({ id: el.user.id });
      });

      queryRunner.commitTransaction();

      return employees;
    } catch (error: any) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
