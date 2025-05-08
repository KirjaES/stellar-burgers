import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrders,
  orderSelectors
} from '../../services/slices/order-slice';

export const ProfileOrders: FC = () => {
  const dispatcher = useDispatch();
  const orders = useSelector(orderSelectors.getUserOrders);
  const isLoading = useSelector(orderSelectors.isLoadingUserOrders);

  useEffect(() => {
    dispatcher(fetchUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} isLoadingOrders={isLoading} />;
};
