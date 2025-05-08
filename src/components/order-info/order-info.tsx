import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderByNumber,
  orderSelectors
} from '../../services/slices/order-slice';
import { ingredientsSelectors } from '../../services/slices/ingredients-slice';

export const OrderInfo: FC = () => {
  const { number: orderNumber } = useParams();
  const dispatcher = useDispatch();

  const orderData = useSelector(orderSelectors.getOrderByNumber);
  const isLoading = useSelector(orderSelectors.isLoadingByNumber);
  const ingredients = useSelector(ingredientsSelectors.get);

  useEffect(() => {
    if (orderNumber) {
      const parsedOrderNumber = Number.parseInt(orderNumber);
      dispatcher(fetchOrderByNumber(parsedOrderNumber));
    }
  }, [dispatcher, orderNumber]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader minWidth={640} />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
