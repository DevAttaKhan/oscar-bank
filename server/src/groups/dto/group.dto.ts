import { Permission } from '@/database/entities';
import { PermissionDto } from '@/permissions/dto/permission.dto';
import { Expose, Transform, Type } from 'class-transformer';

export class GroupDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Type(() => PermissionDto)
  @Expose()
  permissions: PermissionDto[];
}
