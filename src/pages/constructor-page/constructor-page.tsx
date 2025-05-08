import { useSelector } from '../../services/store';

import { FC } from 'react';
import { ingredientsSelectors } from '../../services/slices/ingredients-slice';
import { ConstructorPageUI } from '@ui-pages';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(ingredientsSelectors.isLoading);
  const ingredientsError = useSelector(ingredientsSelectors.error);

  if (ingredientsError) {
    return ingredientsError;
  }

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
