import { type SxProps, Typography } from '@mui/material';

const NoDatText = ({ text, sx = {} }: { text: string; sx?: SxProps }) => {
  return <Typography sx={{ fontWeight: 600, textAlign: 'center', fontStyle: 'italic', ...sx }}>{text}</Typography>;
};

export default NoDatText;
