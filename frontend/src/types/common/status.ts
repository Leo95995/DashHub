export interface ItemStatus<T> {
  data: T | T[];
  loading: boolean;
  error: string | null;
  [key: string]: any;
}


