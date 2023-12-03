import { type FC } from 'react';

import { TableCell } from '@mui/material';

import { type TableBodyCellModel } from '../../@types/custom-table';

const CustomTableBodyCell: FC<TableBodyCellModel> = (props) => {
  const { children, align, width } = props;
  return (
    <TableCell
      width={width}
      align={align}
      sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.divider}`, borderTop: 0, cursor: 'pointer' })}
    >
      {children}
    </TableCell>
  );
};

export default CustomTableBodyCell;
