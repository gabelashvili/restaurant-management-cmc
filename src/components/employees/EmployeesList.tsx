import { Avatar, Box, TableRow, Typography } from '@mui/material';

import UpsertEmployeeModal from './UpsertEmployeeModal';
import CustomTable from '../shared/table/CustomTable';
import CustomTableBodyCell from '../shared/table/CustomTableBodyCell';
import CustomTableHeaderCell from '../shared/table/CustomTableHeaderCell';
import TableHeader from '../shared/TableHeader';

const EmployeesList = () => {
  return (
    <>
      <UpsertEmployeeModal />
      <CustomTable
        header={() => <TableHeader title="თანამშრომლები" />}
        renderTableHeader={() => headers.map((el) => <CustomTableHeaderCell key={el.label} align={el.align} label={el.label} />)}
        renderTableBody={() =>
          list.map((item, i) => (
            <TableRow key={item.id} hover>
              <CustomTableBodyCell width={'5%'}>{`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}</CustomTableBodyCell>
              <CustomTableBodyCell width="20%">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {item.avatar ? <Avatar src={item.avatar} /> : <Avatar>{`${item.firstName[0]}${item.lastName[0]}`}</Avatar>}
                  <Box>
                    <Typography>{`${item.firstName} ${item.lastName} `}</Typography>
                    <Typography sx={{ color: 'text.disabled' }}>{item.email}</Typography>
                  </Box>
                </Box>
              </CustomTableBodyCell>
              <CustomTableBodyCell align="center">{item.firstName}</CustomTableBodyCell>
              <CustomTableBodyCell align="center">{item.firstName}</CustomTableBodyCell>
            </TableRow>
          ))
        }
      />
    </>
  );
};

export default EmployeesList;

const headers = [
  {
    label: '#',
    align: 'left' as const,
  },
  {
    label: 'მომხმარებელი',
    align: 'left' as const,
  },
  {
    label: 'ელ.ფოსტა',
    align: 'center' as const,
  },
  {
    label: 'ტელეფონი',
    align: 'center' as const,
  },
];

const list = [
  {
    id: '6554f9f346ff77c4c1c0496c',
    isActive: false,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyz-77X11MoGE22xVjjPhbpW6lPj6I0SkcTQ&usqp=CAU',
    firstName: 'Pearlie',
    lastName: 'Hopkins',
    gender: 'female',
    email: 'pearliehopkins@mediot.com',
    phone: '+1 (922) 505-3817',
    address: '762 Strauss Street, Dunnavant, Montana, 7110',
    branch: {
      id: '6554f9f3b873c4f1c0f99af7',
      address: '199 Suydam Street, Siglerville',
      name: 'ARTWORLDS',
    },
  },
  {
    id: '6554f9f3b7bb21241aac98ef',
    isActive: false,
    avatar: null,
    firstName: 'Stafford',
    lastName: 'Burton',
    gender: 'male',
    email: 'staffordburton@artworlds.com',
    phone: '+1 (990) 490-2342',
    address: '893 Harman Street, Foxworth, Massachusetts, 9695',
    branch: {
      id: '6554f9f3fcbd1cb1c9651526',
      address: '814 Chauncey Street, Newcastle',
      name: 'XPLOR',
    },
  },
  {
    id: '6554f9f3b785b04800340730',
    isActive: false,
    avatar: null,
    firstName: 'Katy',
    lastName: 'Delgado',
    gender: 'female',
    email: 'katydelgado@xplor.com',
    phone: '+1 (877) 509-2524',
    address: '260 Burnett Street, Chestnut, Wisconsin, 1828',
    branch: {
      id: '6554f9f3209a9c3266c63572',
      address: '808 Hanover Place, Jugtown',
      name: 'QUAREX',
    },
  },
  {
    id: '6554f9f3890ec21b46e6ebcf',
    isActive: true,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyz-77X11MoGE22xVjjPhbpW6lPj6I0SkcTQ&usqp=CAU',
    firstName: 'Small',
    lastName: 'Levine',
    gender: 'male',
    email: 'smalllevine@quarex.com',
    phone: '+1 (902) 493-3852',
    address: '755 Georgia Avenue, Madrid, Kansas, 8996',
    branch: {
      id: '6554f9f36ab74fa6ecb5198a',
      address: '403 Folsom Place, Cochranville',
      name: 'OBLIQ',
    },
  },
  {
    id: '6554f9f32cb6473761dcbe3d',
    isActive: true,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyz-77X11MoGE22xVjjPhbpW6lPj6I0SkcTQ&usqp=CAU',
    firstName: 'Lucile',
    lastName: 'Cox',
    gender: 'female',
    email: 'lucilecox@obliq.com',
    phone: '+1 (973) 581-2989',
    address: '933 Berriman Street, Sena, California, 5297',
    branch: {
      id: '6554f9f35f395cafaed08c1e',
      address: '471 Norfolk Street, Floriston',
      name: 'ECOSYS',
    },
  },
];
