import { Repository, FindManyOptions, FindOptionsOrder } from 'typeorm';
import { PaginatedResult, PaginationOptions } from '../interfaces/pagination.interface';

export async function getPaginatedData<T extends Object>(
  repository: Repository<T>,
  options: PaginationOptions<T> = {},
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10, filters = {}, order, relations = [] } = options;

  const [data, totalItems] = await repository.findAndCount({
    where: filters,
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
