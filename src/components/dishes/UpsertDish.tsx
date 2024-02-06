import { TextField } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';

import Container from '../shared/Container';
import UpsertSectionWrapper from '../shared/UpsertSectionWrapper';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const UpsertDish = () => {
  return (
    <Container title={'sata'} centerTitle sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <UpsertSectionWrapper title={'ზოგადი ინფორმაცია'}>
        <TextField variant="filled" fullWidth label={'პროდუქტის სახელი'} />
        <TextField variant="filled" fullWidth label={'პროდუქტის ფასი'} />
        <TextField variant="filled" fullWidth label={'კატეგორია'} />
      </UpsertSectionWrapper>
      <UpsertSectionWrapper title={'პროდუქტის აღწერა'}>
        <TextField variant="filled" fullWidth label={'პროდუქტის სახელი'} />
        <TextField variant="filled" fullWidth label={'პროდუქტის ფასი'} />
        <TextField variant="filled" fullWidth label={'კატეგორია'} />
      </UpsertSectionWrapper>
    </Container>
  );
};

export default UpsertDish;
