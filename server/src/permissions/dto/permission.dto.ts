import { Expose } from 'class-transformer';

export class PermissionDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
