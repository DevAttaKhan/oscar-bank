import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { SetPermissions } from '@/common/decorators/permissions.decorator';
import { Permissions } from '@/common/constants/common.enum';
import { PaginationOptions } from '@/common/interfaces/pagination.interface';
import { Employee } from '@/database/entities';
import { EmployeeQueryDto } from './dto/empolyee-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  @SetPermissions(Permissions.EMPLOYEES_CREATE)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SetPermissions(Permissions.EMPLOYEES_LIST)
  @Get()
  findAll(@Query() query: EmployeeQueryDto) {
    const filterOptions: PaginationOptions<Employee> = {
      page: query.page,
      limit: query.limit,
      search: query.search,
      fields: query.fields,
      filters: { employmentStatus: query.status },
      order: { [query.orderBy]: query.order },
      relations: ['user'],
    };
    return this.employeesService.findAll(filterOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
