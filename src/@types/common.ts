export interface ResponseModel<T> {
  data: T;
  message: string | null;
  success: boolean;
}

export interface TokensModel {
  accessToken: string;
  refreshToken: string;
}

export interface MultiLangModel {
  ka: string;
  en: string;
}

export type Languages = 'ka' | 'en';

export interface WithPaginationModel<T> {
  count: number;
  list: T;
}

export interface TableFiltersModel {
  page: number;
  limit: number;
  sortBy?: string | null;
  sortDir?: 'asc' | 'desc' | null;
}
