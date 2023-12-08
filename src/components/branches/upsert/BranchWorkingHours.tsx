import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';

import { type BranchModel } from '../../../@types/bracnh';
import UpsertSectionWrapper from '../../shared/UpsertSectionWrapper';
const BranchWorkingHours = () => {
  return (
    <UpsertSectionWrapper title="სამუშაო საათები">
      <TableContainer component={Paper}>
        {moment().locale('ge').format('mmm/ddd/yyyyy')}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">კვირის დღე</TableCell>
              <TableCell align="center">დაწყება</TableCell>
              <TableCell align="center">დასრულება</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(fakeData.workingHours).map((day) => (
              <TableRow key={day}>
                <TableCell align="right">{day}</TableCell>
                {/* <TableCell align="right">{fakeData[day as keyof typeof fakeData].start}</TableCell>
                <TableCell align="right">{fakeData[day as keyof typeof fakeData].end}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </UpsertSectionWrapper>
  );
};

export default BranchWorkingHours;

const fakeData: BranchModel = {
  id: Math.random().toString(),
  name: {
    ge: 'სახელი ქართულად',
    en: 'English Name',
  },
  address: {
    ge: 'მისამართ ქართულად',
    en: 'address english',
  },
  email: 'test@gmail.com',
  phone: '+995557968742',
  managers: [],
  workingHours: {
    monday: {
      start: '10:00 AM',
      end: '10:00 PM',
    },
    tuesday: {
      start: '10:00 AM',
      end: '10:00 PM',
    },
    wednesday: {
      start: '10:00 AM',
      end: '10:00 PM',
    },
    thursday: {
      start: '10:00 AM',
      end: '10:00 PM',
    },
    friday: {
      start: '10:00 AM',
      end: '10:00 PM',
    },
    saturday: {
      start: '10:00 AM',
      end: '12:00 AM',
    },
    sunday: {
      start: '10:00 AM',
      end: '12:00 AM',
    },
  },
  exceptions: [],
};
