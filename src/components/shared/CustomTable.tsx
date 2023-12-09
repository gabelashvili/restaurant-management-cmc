import { type FC, type ReactElement } from 'react';

import { Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';

interface CustomTableProps {
  header?: () => ReactElement;
  renderTableHeader: () => ReactElement | ReactElement[];
  renderTableBody: () => ReactElement | ReactElement[];
  paginationOpts?: any;
}
const CustomTable: FC<CustomTableProps> = ({ header, renderTableBody, renderTableHeader, paginationOpts }) => {
  return (
    <TableContainer component={Paper} sx={{ display: 'grid' }}>
      {header && header()}
      <Scrollbars autoHeight autoHeightMax={'100%'}>
        <Table>
          <TableHead>
            <TableRow>{renderTableHeader()}</TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </Scrollbars>
      {paginationOpts && (
        <TablePagination
          sx={{ m: 3, display: 'flex', justifyContent: 'flex-end' }}
          count={250}
          rowsPerPage={10}
          page={2}
          component={'div'}
          onChange={() => {}}
          onPageChange={() => {}}
        />
      )}
    </TableContainer>
  );
};

export default CustomTable;
