import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useLocation, useSearchParams } from 'react-router-dom';

import { type SettingsTabModel } from '../@types/auth';
import SettingsMenu from '../components/settings/SettingsMenu';
import UpdateBaseInfo from '../components/settings/UpdateBaseInfo/UpdateBaseInfo';
import UpdatePassword from '../components/settings/UpdatePassword';

const UserSettings = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = useState<SettingsTabModel>(location.search.includes('update-password') ? 'password' : 'details');

  useEffect(() => {
    if (location.search.includes('update-password')) {
      setTab('password');
      searchParams.delete('update-password');
      setSearchParams(searchParams);
    }
    if (location.search.includes('update-details')) {
      setTab('details');
      searchParams.delete('update-details');
      setSearchParams(searchParams);
    }
  }, [location]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(300px, 1fr) 3fr' }, gap: 3 }}>
      <SettingsMenu tab={tab} setTab={setTab} />
      {tab === 'details' && <UpdateBaseInfo />}
      {tab === 'password' && <UpdatePassword />}
    </Box>
  );
};

export default UserSettings;
