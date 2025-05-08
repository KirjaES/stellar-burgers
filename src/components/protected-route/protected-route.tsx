import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  children?: ReactNode;
  isOnlyAnonymous?: boolean;
};

export const ProtectedRoute = ({
  children,
  isOnlyAnonymous
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isLoading = useSelector(userSelectors.isLoading);
  const isAuthorized = useSelector(userSelectors.isAuthorized);

  if (isLoading) return <Preloader />;

  if (isOnlyAnonymous && isAuthorized) {
    return <Navigate replace to='/' state={{ from: location }} />;
  }

  if (!isOnlyAnonymous && !isAuthorized)
    return <Navigate replace to='/login' state={{ from: location }} />;

  return children;
};
