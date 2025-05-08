import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logout, updateUser } from '../../services/slices/user-slice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatcher = useDispatch();

  const handleLogout = () => dispatcher(logout());

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
