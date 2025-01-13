import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface Props { 
    children: ReactNode,
    allowedRole: number
}

const PrivateRoute  = ({ children, allowedRole }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user)

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
