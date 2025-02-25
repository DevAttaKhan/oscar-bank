import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { SetPermissions } from '@/common/decorators/permissions.decorator';
import { Permissions } from '@/common/constants/common.enum';
import { GroupQueryDto } from './dto/group-query.dto';
import { PaginationOptions } from '@/common/interfaces/pagination.interface';
import { Group } from '@/database/entities';
import { Not } from 'typeorm';

@UseGuards(JwtAuthGuard)
@SetPermissions(Permissions.PERMISSIONS_MANAGE, Permissions.GROUPS_MANAGE)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  // @Serialize(GroupDto)
  findAll(@Query() query: GroupQueryDto) {
    const filterOptions: PaginationOptions<Group> = {
      page: query.page,
      limit: query.limit,
      search: query.search,
      fields: query.fields,
      filters: { name: Not('super admin') },
      relations: ['permissions'],
      order: { [query.orderBy]: query.order },
    };

    return this.groupsService.findAll(filterOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete()
  remove(@Query('ids') ids: string) {
    if (!ids) {
      throw new BadRequestException();
    }

    const groupIds = ids.split(',').map((el) => Number(el));

    return this.groupsService.remove(groupIds);
  }
}
