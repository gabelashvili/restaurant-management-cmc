import { type FC, type ReactElement } from 'react';

import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';

interface CustomTableProps {
  header?: () => ReactElement;
  renderTableHeader: () => ReactElement | ReactElement[];
  renderTableBody: () => ReactElement | ReactElement[] | undefined;
  paginationOpts?: {
    count: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    page: number;
  };
  loading?: boolean;
  dataCount: number;
}

const renderEmptyCells = (count: number) =>
  new Array(count).fill(0).map((_, i) => (
    <TableRow key={i}>
      <TableCell sx={{ visibility: 'hidden' }}>empty</TableCell>
    </TableRow>
  ));

const CustomTable: FC<CustomTableProps> = ({ header, renderTableBody, renderTableHeader, paginationOpts, dataCount, loading }) => {
  return (
    <TableContainer component={Paper} sx={{ display: 'grid' }}>
      {header && header()}
      <Scrollbars autoHeight autoHeightMax={'100%'}>
        <Table sx={{ position: 'relative' }}>
          <TableHead>
            <TableRow>{renderTableHeader()}</TableRow>
          </TableHead>
          <TableBody>
            {renderTableBody()}
            {paginationOpts && renderEmptyCells(paginationOpts.limit - dataCount)}
          </TableBody>
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Table>
      </Scrollbars>
      {paginationOpts && (
        <TablePagination
          sx={{ m: 3, display: 'flex', justifyContent: 'flex-end' }}
          count={paginationOpts.count}
          rowsPerPage={paginationOpts.limit}
          page={paginationOpts.page - 1}
          component={'div'}
          onPageChange={(_, value) => paginationOpts.onPageChange(Number(value) + 1)}
          onRowsPerPageChange={(e) => paginationOpts.onLimitChange(Number(e.target.value))}
        />
      )}
    </TableContainer>
  );
};

export default CustomTable;
