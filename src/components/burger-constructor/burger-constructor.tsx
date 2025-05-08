import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/slices/burger-constructor-slice';
import {
  makeOrder,
  orderActions,
  orderSelectors
} from '../../services/slices/order-slice';
import { userSelectors } from '../../services/slices/user-slice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatcher = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const constructorItems = useSelector(
    burgerConstructorSelectors.getConstructorState
  );
  const isOrderLoading = useSelector(orderSelectors.isLoadingConstructorOrder);
  const orderModalData = useSelector(orderSelectors.getConstructorOrder);
  const isAuthorized = useSelector(userSelectors.isAuthorized);

  const onOrderClick = () => {
    if (!isAuthorized) {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (!constructorItems.bun || isOrderLoading) return;

    const orderRequest = [constructorItems.bun._id]
      .concat(constructorItems.ingredients.map((i) => i._id))
      .concat(constructorItems.bun._id);

    dispatcher(makeOrder(orderRequest));
  };

  const closeOrderModal = () => {
    dispatcher(orderActions.clearConstructorOrder());
    dispatcher(burgerConstructorActions.clearAll());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isOrderLoading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
