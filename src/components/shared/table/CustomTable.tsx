import { type ReactNode, type FC, type ReactElement, useState } from 'react';

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
import { useTranslation } from 'react-i18next';

import AdditionalTableFilters from './AdditionalTableFilters';
import NoDatText from '../NoDatText';

interface CustomTableProps {
  header?: ({ openAdditionalFilters }: { openAdditionalFilters: VoidFunction }) => ReactElement;
  renderTableHeader: () => ReactElement | ReactElement[];
  renderTableBody: () => ReactElement | ReactElement[] | undefined;
  paginationOpts?: {
    count: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    page: number;
    visibleDataCount: number;
  };
  loading?: boolean;
  additionalFilters?: () => ReactNode;
}

const renderEmptyCells = (count: number) =>
  new Array(count).fill(0).map((_, i) => (
    <TableRow key={i}>
      <TableCell sx={{ visibility: 'hidden', height: 73 }}>empty</TableCell>
    </TableRow>
  ));

const CustomTable: FC<CustomTableProps> = ({ header, renderTableBody, renderTableHeader, paginationOpts, loading, additionalFilters }) => {
  const { t } = useTranslation();
  const [openAdditionalFilters, setOpenAdditionalFilters] = useState(false);
  return (
    <>
      {additionalFilters && (
        <AdditionalTableFilters open={openAdditionalFilters} setOpen={setOpenAdditionalFilters}>
          {additionalFilters()}
        </AdditionalTableFilters>
      )}
      <TableContainer component={Paper} sx={{ display: 'grid' }}>
        {header && header({ openAdditionalFilters: () => setOpenAdditionalFilters(true) })}
        <Scrollbars autoHeight autoHeightMax={'100%'}>
          <Table sx={{ position: 'relative' }}>
            <TableHead>
              <TableRow>{renderTableHeader()}</TableRow>
            </TableHead>
            <TableBody>
              {renderTableBody()}
              {paginationOpts && renderEmptyCells(paginationOpts.limit - paginationOpts.visibleDataCount)}
              <tr>
                <td>
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
                  {!loading && paginationOpts?.visibleDataCount === 0 && (
                    <NoDatText
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
                      text={t('common.data_not_found')}
                    />
                  )}
                </td>
              </tr>
            </TableBody>
          </Table>
        </Scrollbars>
        {paginationOpts && !loading && paginationOpts?.visibleDataCount !== 0 && (
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
    </>
  );
};

export default CustomTable;
