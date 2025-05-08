import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const initialState = {
  ingredients: [] as TConstructorIngredient[],
  bun: null as TConstructorIngredient | null
};

type SwapIngredientPayload = {
  ingredientIndex1: number;
  ingredientIndex2: number;
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          // Уникальный id для перемещения внутри конструктора
          id: nanoid()
        }
      })
    },
    swapIngredient: {
      reducer: (state, action: PayloadAction<SwapIngredientPayload>) => {
        const temp = state.ingredients[action.payload.ingredientIndex1];
        state.ingredients[action.payload.ingredientIndex1] =
          state.ingredients[action.payload.ingredientIndex2];
        state.ingredients[action.payload.ingredientIndex2] = temp;
      },
      prepare: (ingredientIndex1, ingredientIndex2) => ({
        payload: {
          ingredientIndex1,
          ingredientIndex2
        }
      })
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
      );
    },
    clearAll(state) {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun,
    getConstructorState: (state) => state
  }
});

export const burgerConstructorSelectors = burgerConstructorSlice.selectors;
export const burgerConstructorActions = burgerConstructorSlice.actions;
