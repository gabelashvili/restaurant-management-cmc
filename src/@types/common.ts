export type RowType = 'TEXT';

export interface TableHeaderModel {
  label: string;
  key: string;
  align: 'right' | 'left' | 'center' | 'inherit' | 'justify';
  type: RowType;
}

export interface ResponseModel<T> {
  data: T;
  message: string | null;
  success: boolean;
}

export interface TokensModel {
  accessToken: string;
  refreshToken: string;
}
