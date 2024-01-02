import { type ReactElement } from 'react';

export type RowType = 'TEXT';

export interface TableHeaderCellModel {
  label: string;
  align: 'right' | 'left' | 'center' | 'inherit' | 'justify';
  orderKey?: string;
  handleOrder?: (order: 'asc' | 'desc') => void;
  order?: 'asc' | 'desc' | null;
}

export interface TableBodyCellModel {
  children: ReactElement | string;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify';
  width?: string;
}
export interface TableFiltersModel {
  page: number;
  limit: number;
  sortBy?: string | null;
  sortDir?: 'asc' | 'desc' | null;
  search?: string;
  order?: {
    name: string;
    order: 'asc' | 'desc';
  };
}
