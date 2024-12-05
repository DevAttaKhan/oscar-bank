import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Designation, Employee } from '@/database/entities';
import { Repository } from 'typeorm';
import { PaginationOptions } from '@/common/interfaces/pagination.interface';
import { getPaginatedData } from '@/common/util/pagination.util';

@Injectable()
export class DesignationService {
  constructor(@InjectRepository(Designation) private designationRepo: Repository<Designation>) {}

  create(createDesignationDto: CreateDesignationDto) {
    return this.designationRepo.save(createDesignationDto);
  }

  async findAll(options: PaginationOptions<Designation>) {
    try {
      const queryBuilder = this.designationRepo.createQueryBuilder('designation');
      const offset = (options.page - 1) * options.limit;

      // Join with employees to calculate employee count
      queryBuilder
        .leftJoin('designation.employee', 'employee')
        .addSelect('COUNT(employee.id)', 'employeeCount')
        .groupBy('designation.id');

      // Search filter
      if (options.search) {
        queryBuilder.andWhere('(designation.title ILIKE :search)', {
          search: `%${options.search}%`,
        });
      }

      // Sorting;
      if (options.orderBy === 'employeeCount') {
        queryBuilder.orderBy('COUNT(employee.id)', options.orderDirection.toLowerCase() as any);
      } else {
        queryBuilder.orderBy(
          `designation.${options.orderBy}`,
          options.orderDirection.toLocaleUpperCase() as any,
        );
      }
      queryBuilder.skip(offset).take(options.limit);
      const [data, totalItems] = await queryBuilder.getManyAndCount();
      const totalPages = totalItems > 0 ? Math.ceil(totalItems / options.limit) : 0;

      return {
        data,
        meta: {
          totalItems,
          itemsPerPage: options.limit,
          totalPages,
          currentPage: options.page,
        },
      };
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }

  findOne(id: number) {
    this.designationRepo.find({});
    return this.designationRepo.findOneBy({ id });
  }

  async update(id: number, updateDesignationDto: UpdateDesignationDto) {
    const savedRecord = await this.designationRepo.findOneBy({ id });
    if (!savedRecord) {
      throw new NotFoundException('Designation Not Foundd');
    }
    savedRecord.description = updateDesignationDto.description || savedRecord.description;
    savedRecord.title = updateDesignationDto.title;

    return this.designationRepo.save(savedRecord);
  }

  remove(ids: number[]) {
    return this.designationRepo.delete(ids);
  }
}
