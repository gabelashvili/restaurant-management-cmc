import { useState } from 'react';

import { Box, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Container from '../shared/Container';
import EditorToolbar, { formats, modules } from '../shared/EditorToolbar';
import ImageUpload from '../shared/ImageUpload';
import UpsertSectionWrapper from '../shared/UpsertSectionWrapper';

const UpsertDish = () => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);

  return (
    <Container title={'sata'} centerTitle sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <UpsertSectionWrapper title={'ზოგადი ინფორმაცია'}>
        <Box sx={{ display: 'grid', gap: 6, width: '100%', gridTemplateColumns: '1fr 180px' }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', width: '100%' }}>
            <TextField variant="filled" fullWidth label={'პროდუქტის სახელი'} />
            <TextField variant="filled" fullWidth label={'პროდუქტის ფასი'} />
            <TextField variant="filled" fullWidth label={'კატეგორია'} />
          </Box>
          <Box sx={{ width: '100%', height: '100%' }}>
            <ImageUpload file={file} setFile={setFile} url={null} />
          </Box>
        </Box>
      </UpsertSectionWrapper>
      <UpsertSectionWrapper title={'პროდუქტის აღწერა'}>
        <div className="text-editor">
          <EditorToolbar />
          <ReactQuill
            style={{ wordBreak: 'break-all', minHeight: 150 }}
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </div>
      </UpsertSectionWrapper>
    </Container>
  );
};

export default UpsertDish;