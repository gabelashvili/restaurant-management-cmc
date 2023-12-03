import { Paper, TableContainer } from '@mui/material';

import TableHeader from '../shared/TableHeader';

const BranchesList = () => {
  return (
    <TableContainer component={Paper} sx={{ display: 'grid' }}>
      <TableHeader title="ფილიალები" />
    </TableContainer>
  );
};

export default BranchesList;
