import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from './store';
import { type SignInRespModel } from '../@types/auth';
import { useLazyAuthedUserQuery } from '../store/api/authApi';
import { setAuthState, setAuthedUserId } from '../store/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { auth } = useAppSelector((state) => state);
  const [getAuthedUserData] = useLazyAuthedUserQuery();

  const getLocalStorageData = () => {
    const storageData = localStorage.getItem('auth');
    if (!storageData) {
      dispatch(setAuthState('not-authorized'));
      return;
    }
    try {
      const authData = JSON.parse(storageData) as SignInRespModel;
      dispatch(setAuthedUserId(authData.userId));
    } catch (error) {}
  };

  useEffect(() => {
    if (auth.userId) {
      getAuthedUserData();
    }
  }, [auth.userId]);

  useEffect(() => {
    getLocalStorageData();
  }, []);

  return {
    state: auth.state,
  };
};

export default useAuth;
