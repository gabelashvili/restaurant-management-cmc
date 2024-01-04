import { type FC } from 'react';

import { ArrowDownward } from '@mui/icons-material';
import { Box, TableCell } from '@mui/material';

import { type TableHeaderCellModel } from '../../../@types/custom-table';

const CustomTableHeaderCell: FC<TableHeaderCellModel> = (props) => {
  const { align, label, sortKey, handleOrder, sortDir } = props;

  return (
    <TableCell
      align={align}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        fontWeight: 600,
        borderRight: 0,
        borderLeft: 0,
        '&:hover > div > svg': {
          opacity: 1,
        },
      })}
      onClick={() => handleOrder && handleOrder(sortDir === 'asc' ? 'desc' : 'asc')}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: align }}>
        {label}
        {sortKey && (
          <ArrowDownward
            sx={{
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              mt: 0.2,
              opacity: sortDir ? 1 : 0,
              transform: `rotate(${sortDir === 'asc' ? '180deg' : '0deg'})`,
            }}
          />
        )}
      </Box>
    </TableCell>
  );
};

export default CustomTableHeaderCell;
