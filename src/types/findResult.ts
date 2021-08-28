export interface FindResult<T> {
  result: string;
  data: T[];
  count: number;
}

export interface CreateResult<T> {
  result: string;
  data: T;
}
