import { Box, Divider, Typography } from '@mui/material';

import BranchBaseInfo from './BranchBaseInfo';
import BranchWorkingHours from './BranchWorkingHours';
import Container from '../../shared/Container';

const UpsertBranch = () => {
  return (
    <Container title="ფილიალის დამატება" centerTitle>
      <BranchBaseInfo />
      <Divider sx={{ mt: 4, mb: 2 }} />
      <BranchWorkingHours />
      <Divider sx={{ mt: 4, mb: 2 }} />
      <Box>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>გამონაკლისი დღეები</Typography>
      </Box>
    </Container>
  );
};

export default UpsertBranch;
