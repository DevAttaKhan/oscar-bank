import { EmploymentStatus } from '@/common/constants/common.enum';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class EmployeeQueryDto extends PaginationDto {
  @IsString()
  @IsEnum(EmploymentStatus)
  @IsOptional()
  status: EmploymentStatus;
}
