import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store';

export const useAuthRedirect = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (user?.role === 1) navigate('/business');
      if (user?.role === 2) navigate('/client');
    }
  }, [token, user, navigate]);
};
