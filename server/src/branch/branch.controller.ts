import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { SetPermissions } from '@/common/decorators/permissions.decorator';
import { Permissions } from '@/common/constants/common.enum';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/common/decorators/current-user.decorator';
import { IUserFlattenedPermissions } from '@/common/interfaces/user.interface';
import { PaginationOptions } from '@/common/interfaces/pagination.interface';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { BranchQueryDto } from './dto/query.dto';
import { Branch } from './entities/branch.entity';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @SetPermissions(Permissions.BRANCH_CREATE)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user: IUserFlattenedPermissions, @Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @SetPermissions(Permissions.BRANCH_LIST)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: BranchQueryDto) {
    const filterOptions: PaginationOptions<Branch> = {
      page: query.page,
      limit: query.limit,
      search: query.search,
      fields: query.fields,
      filters: { status: query.status },
      order: { [query.orderBy]: query.order },
    };
    return this.branchService.findAll(filterOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
