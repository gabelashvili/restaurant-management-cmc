import { type ReactElement } from 'react';

export type RowType = 'TEXT';

export interface TableHeaderCellModel {
  label: string;
  align: 'right' | 'left' | 'center' | 'inherit' | 'justify';
}

export interface TableBodyCellModel {
  children: ReactElement | string;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify';
  width?: string;
}
