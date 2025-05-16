import {
  ingredientsSlice,
  fetchIngredients
} from '../slices/ingredients-slice';
import ingredientsMock from '../__mocks__/ingredients.json';

const initialState = {
  ingredients: [],
  isLoading: true,
  error: undefined
};

describe('feedsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Должен правильно обрабатывать ожидание', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('Должен правильно обрабатывать успешный ответ', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredientsMock
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredientsMock);
    expect(state.error).toBeUndefined();
  });

  it('Должен правильно обрабатывать ошибку', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'error mock' }
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error mock');
  });
});
