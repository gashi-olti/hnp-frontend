export interface PaginatedMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginatedMeta;
}
