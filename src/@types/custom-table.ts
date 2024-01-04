import { type ReactElement } from 'react';

export type RowType = 'TEXT';

export interface TableHeaderCellModel {
  label: string;
  align: 'right' | 'left' | 'center' | 'inherit' | 'justify';
  sortKey?: string;
  handleOrder?: (order: 'asc' | 'desc') => void;
  sortDir?: 'asc' | 'desc' | null;
}

export interface TableBodyCellModel {
  children: ReactElement | string;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify';
  width?: string;
}
