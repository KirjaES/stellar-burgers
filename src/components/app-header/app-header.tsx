import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const { name } = useSelector(userSelectors.getUser);

  return <AppHeaderUI userName={name} />;
};
