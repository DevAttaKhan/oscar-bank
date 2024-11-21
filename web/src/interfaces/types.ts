export type Option = Record<string, any>;

export interface IApiResponse<T> {
  status: boolean;
  path: string;
  statusCode: number;
  result: Result<T>;
}

export interface Result<T> {
  data: T[];
  meta: ResponseMeta;
}

export interface ResponseMeta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
export interface IApiError {
  status: false;
  statusCode: number;
  path: string;
  message: string;
  errors?: string[];
}

export interface IPermission {
  id: number;
  name: string;
  description?: string;
}
