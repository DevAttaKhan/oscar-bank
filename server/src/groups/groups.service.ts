import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, In } from 'typeorm';
import { Group } from '@/database/entities/group.entity';
import { Permission } from '@/database/entities/permission.entity';
import { PaginationOptions } from '@/common/interfaces/pagination.interface';
import { getPaginatedData } from '@/common/util/pagination.util';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepo: Repository<Group>,
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
  ) {}

  create(dto: CreateGroupDto) {
    const createdPermissions = dto.permissions.map((permission) =>
      this.permissionRepo.create({ id: permission }),
    );

    return this.groupRepo.save({
      name: dto.name,
      description: dto.description,
      permissions: createdPermissions,
    });
  }

  async findAll(options: PaginationOptions<Group>) {
    return getPaginatedData(this.groupRepo, options);
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  async update(id: number, dto: UpdateGroupDto) {
    try {
      // Find the group by ID
      const group = await this.groupRepo.findOne({
        where: { id },
        relations: ['permissions'],
      });

      if (!group) {
        throw new NotFoundException('Group Not Found');
      }

      // Update basic fields
      group.name = dto.name;
      group.description = dto.description;

      // Update permissions (assumes dto.permissions contains permission IDs)
      const permissions = await this.permissionRepo.findBy({ id: In(dto.permissions) }); // Find permissions by their IDs
      group.permissions = permissions; // Update the permissions relation

      return this.groupRepo.save(group);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return this.groupRepo.delete(id);
  }
}
