import { BranchStatus } from '@/common/constants/common.enum';
import { PaginationQueryDto } from '@/common/dtos/pagination.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class BranchQueryDto extends PaginationQueryDto {
  @IsString()
  @IsEnum(BranchStatus)
  @IsOptional()
  status: BranchStatus;
}
