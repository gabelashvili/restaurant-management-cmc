import { type FC, type Dispatch, type SetStateAction, type ChangeEvent } from 'react';

import { Add, CloudUpload, CloudUploadOutlined, Image } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const MAX_FILE_SIZE_IN_MB = 2;

interface Props {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  url: string | null;
  maxFileSize?: number;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImageUpload: FC<Props> = ({ file, setFile, maxFileSize = MAX_FILE_SIZE_IN_MB }) => {
  const { t } = useTranslation();

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeInImb = file.size / 1048576;
      if (fileSizeInImb > maxFileSize) {
        toast.error(t('upload_image.max_size', { size: `${maxFileSize}MB` }));
        return;
      }
      setFile(file);
    }
    event.target.value = '';
  };

  return (
    <Box sx={{ width: 'calc(100% - 18px)', height: '100%', borderRadius: 2, position: 'relative' }}>
      <Box sx={{ width: '100%', height: '100%', bgcolor: 'secondary.300', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100%', gap: 0.5 }}>
          <CloudUploadOutlined fontSize={'large'} />
          <Typography>სურათის ატვირთვა</Typography>
        </Box>
      </Box>

      <LoadingButton
        component={'label'}
        variant="contained"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          transform: 'translate(50%, 100%)',
          p: 0,
          minWidth: 'auto',
          width: 35,
          height: 35,
        }}
      >
        <Add />
        <VisuallyHiddenInput onChange={handleUpload} type="file" accept="image/png, image/jpg, image/jpeg" />
      </LoadingButton>
    </Box>
  );
};

export default ImageUpload;
