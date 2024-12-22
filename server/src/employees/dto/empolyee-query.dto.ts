import { EmploymentStatus } from '@/common/constants/common.enum';
import { PaginationQueryDto } from '@/common/dtos/pagination.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class EmployeeQueryDto extends PaginationQueryDto {
  @IsString()
  @IsEnum(EmploymentStatus)
  @IsOptional()
  status: EmploymentStatus;
}
