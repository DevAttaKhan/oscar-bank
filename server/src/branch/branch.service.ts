import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';
import { getPaginatedData } from '@/common/util/pagination.util';
import { PaginationOptions } from '@/common/interfaces/pagination.interface';

@Injectable()
export class BranchService {
  constructor(@InjectRepository(Branch) private branchRepo: Repository<Branch>) {}
  create(createBranchDto: CreateBranchDto) {
    return this.branchRepo.save(createBranchDto);
  }

  async findAll(options: PaginationOptions<Branch>) {
    return await getPaginatedData(this.branchRepo, options);
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
