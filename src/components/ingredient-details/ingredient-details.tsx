import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientsSelectors } from '../../services/slices/ingredients-slice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(ingredientsSelectors.get);
  const isLoading = useSelector(ingredientsSelectors.isLoading);
  const ingredientData = ingredients.find((i) => i._id === id);

  if (isLoading) {
    return <Preloader minWidth={640} />;
  }

  if (!ingredientData) {
    return <Navigate to='/404' />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
