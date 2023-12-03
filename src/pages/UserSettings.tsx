import { useState } from 'react';

import { Box } from '@mui/material';

import { type SettingsTabModel } from '../@types/auth';
import SettingsMenu from '../components/settings/SettingsMenu';
import UpdateBaseInfo from '../components/settings/UpdateBaseInfo/UpdateBaseInfo';
import UpdatePassword from '../components/settings/UpdatePassword';

const UserSettings = () => {
  const [tab, setTab] = useState<SettingsTabModel>('details');
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(300px, 1fr) 3fr' }, gap: 3 }}>
      <SettingsMenu tab={tab} setTab={setTab} />
      {tab === 'details' && <UpdateBaseInfo />}
      {tab === 'password' && <UpdatePassword />}
    </Box>
  );
};

export default UserSettings;
