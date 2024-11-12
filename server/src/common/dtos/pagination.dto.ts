import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number = 5;

  @IsString()
  @IsOptional()
  orderBy?: string = 'id';

  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc' = 'desc';

  @IsString()
  @IsOptional()
  fields?: string;
}
