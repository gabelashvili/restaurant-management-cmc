import { type FC } from 'react';

import { TableCell } from '@mui/material';

import { type TableHeaderCellModel } from '../../../@types/custom-table';

const CustomTableHeaderCell: FC<TableHeaderCellModel> = (props) => {
  const { align, label } = props;
  return (
    <TableCell
      align={align}
      sx={(theme) => ({ border: `1px solid ${theme.palette.divider}`, cursor: 'pointer', fontWeight: 600, borderRight: 0, borderLeft: 0 })}
    >
      {label}
    </TableCell>
  );
};

export default CustomTableHeaderCell;
