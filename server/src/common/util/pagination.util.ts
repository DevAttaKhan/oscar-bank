import { Repository, ILike } from 'typeorm';
import { PaginatedResult, PaginationOptions } from '../interfaces/pagination.interface';
import { mapFieldsToSearchFilters } from './common.util';
import { Expose, Type } from 'class-transformer';
import { PaginationMetaDto } from '../dtos/pagination.dto';

const buildSearchFilter = (search: string, fields: string[]) => {
  if (!search || !fields) return [];

  return mapFieldsToSearchFilters(search, fields);
};

export async function getPaginatedData<T extends Object>(
  repository: Repository<T>,
  options: PaginationOptions<T> = {},
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10, filters = {}, order, relations = [], search, fields } = options;

  const [data, totalItems] = await repository.findAndCount({
    where: [filters as any, ...buildSearchFilter(search, fields?.split(','))],
    take: limit,
    skip: (page - 1) * limit,
    relations,
    order,
  });

  const totalPages = totalItems > 0 ? Math.ceil(totalItems / limit) : 0;

  return {
    data,
    meta: {
      totalItems,
      itemsPerPage: limit,
      totalPages,
      currentPage: page,
    },
  };
}

export const createPaginatedDto = <DataDto>(dataClass: new () => DataDto) => {
  class PaginatedDto {
    @Type(() => dataClass)
    @Expose()
    data: DataDto;

    @Type(() => PaginationMetaDto)
    @Expose()
    meta: PaginationMetaDto;
  }
  return PaginatedDto;
};
