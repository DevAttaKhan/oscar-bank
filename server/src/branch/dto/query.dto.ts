import { BranchStatus } from '@/common/constants/common.enum';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class BranchQueryDto extends PaginationDto {
  @IsString()
  @IsEnum(BranchStatus)
  @IsOptional()
  status: BranchStatus;
}
