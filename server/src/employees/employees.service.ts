import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch, Designation, Employee, User } from '@/database/entities';
import { Repository } from 'typeorm';
import { PaginationOptions } from '@/common/interfaces/pagination.interface';
import { getPaginatedData } from '@/common/util/pagination.util';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    console.log(dto);
    // return;
    const queryRunner = this.employeeRepo.manager.connection.createQueryRunner();

    // Start the transaction
    await queryRunner.startTransaction();

    try {
      // Create and save the User first -
      // this dto have both user and employee date by creating user it will automatically save user related properties to the modal
      const user = this.userRepo.create(dto);
      await queryRunner.manager.save(user);

      const branch = await queryRunner.manager.getRepository(Branch).findOneBy({ id: dto.assignedBranchId });
      const designation = await queryRunner.manager
        .getRepository(Designation)
        .findOneBy({ id: dto.designationId });

      // Create the employee and associate it with the user
      const employee = this.employeeRepo.create({
        ...dto,
        assignedBranch: branch,
        designation: designation,
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
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
