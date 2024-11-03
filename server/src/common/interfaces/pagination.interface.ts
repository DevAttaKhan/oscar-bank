import { FindOptionsOrder } from 'typeorm';

export interface PaginationOptions<T> {
  page?: number;
  limit?: number;
  filters?: Partial<T>;

  order?: FindOptionsOrder<T>;
  relations?: string[];
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
