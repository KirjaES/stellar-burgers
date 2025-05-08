import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { burgerConstructorActions } from '../../services/slices/burger-constructor-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatcher = useDispatch();

    const handleMoveDown = () =>
      dispatcher(burgerConstructorActions.swapIngredient(index, index + 1));

    const handleMoveUp = () =>
      dispatcher(burgerConstructorActions.swapIngredient(index, index - 1));

    const handleClose = () =>
      dispatcher(burgerConstructorActions.removeIngredient(ingredient));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
