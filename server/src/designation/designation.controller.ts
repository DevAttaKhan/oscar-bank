import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { DesignationService } from './designation.service';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { PaginationOptions } from '@/common/interfaces/pagination.interface';
import { Designation } from '@/database/entities';
import { PaginationQueryDto } from '@/common/dtos/pagination.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { SetPermissions } from '@/common/decorators/permissions.decorator';
import { Permissions } from '@/common/constants/common.enum';

@UseGuards(JwtAuthGuard)
@Controller('designation')
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {}

  @SetPermissions(Permissions.DESIGNATION_CREATE)
  @Post()
  create(@Body() createDesignationDto: CreateDesignationDto) {
    return this.designationService.create(createDesignationDto);
  }

  @SetPermissions(Permissions.DESIGNATION_LIST)
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    const filterOptions: PaginationOptions<Designation> = {
      page: query.page,
      limit: query.limit,
      search: query.search,
      fields: query.fields,
      orderBy: query.orderBy,
      orderDirection: query.order,
      relations: ['employee'],
    };
    return this.designationService.findAll(filterOptions);
  }

  @SetPermissions(Permissions.DESIGNATION_READ)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.designationService.findOne(+id);
  }

  @SetPermissions(Permissions.DESIGNATION_UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesignationDto: UpdateDesignationDto) {
    return this.designationService.update(+id, updateDesignationDto);
  }

  @SetPermissions(Permissions.DESIGNATION_DELETE)
  @Delete()
  remove(@Query('ids') ids: string) {
    if (!ids) {
      throw new BadRequestException();
    }

    const designationIds = ids.split(',').map((el) => Number(el));

    return this.designationService.remove(designationIds);
  }
}
