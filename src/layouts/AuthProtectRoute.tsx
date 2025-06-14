import { useEffect, useState } from 'react';
import { tokenManager } from '../utils/TokenManager';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/store';
import { baseApiAxios } from '../api/baseApi';

import { userSlice } from '../store/slices/userSlice';

export const ProtectedRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuth) {
        setIsChecking(false);
        return;
      }

      try {
        console.log(refreshToken);
        const response = await baseApiAxios.post('/auth/refresh', {
          refreshToken,
        });
        tokenManager.setAccessToken(response.data.accessToken);
        tokenManager.setRefreshToken(response.data.refreshToken);
        dispatch(userSlice.actions.login());
      } catch (error) {
        dispatch(userSlice.actions.logout());
        tokenManager.removeTokens();
        navigate('/auth/login', { replace: true });
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [isAuth, navigate]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return isAuth ? children : navigate('/login', { replace: true });
};
