import { Repository, ILike } from 'typeorm';
import { PaginatedResult, PaginationOptions } from '../interfaces/pagination.interface';
import { mapFieldsToSearchFilters } from './common.util';

const buildSearchFilter = (search: string, fields: string[]) => {
  if (!search || !fields) return undefined;

  return mapFieldsToSearchFilters(search, fields);
};

export async function getPaginatedData<T extends Object>(
  repository: Repository<T>,
  options: PaginationOptions<T> = {},
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10, filters = {}, order, relations = [], search, fields } = options;

  const [data, totalItems] = await repository.findAndCount({
    where: {
      ...filters,
      ...(search && buildSearchFilter(search, fields.split(','))),
    },
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
