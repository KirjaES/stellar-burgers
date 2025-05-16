import { TIngredient } from '@utils-types';
import {
  burgerConstructorActions,
  burgerConstructorSlice
} from '../slices/burger-constructor-slice';

const initialState = {
  ingredients: [],
  bun: null
};

const ingredientBunMock: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const ingredientMainMock: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const ingredientSauceMock: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

const mockedId = 'mockedId';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => mockedId
}));

describe('burgerConstructorSlice', () => {
  describe('addIngredient', () => {
    test('Булка корректно добавляется', () => {
      const newState = burgerConstructorSlice.reducer(
        initialState,
        burgerConstructorActions.addIngredient(ingredientBunMock)
      );

      expect(newState.bun).toEqual({
        ...ingredientBunMock,
        id: mockedId
      });
    });

    test('Ингридиент main корректно добавляется', () => {
      const newState = burgerConstructorSlice.reducer(
        initialState,
        burgerConstructorActions.addIngredient(ingredientMainMock)
      );

      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toEqual({
        ...ingredientMainMock,
        id: mockedId
      });
      expect(newState.bun).toBeNull();
    });
  });

  describe('swapIngredient', () => {
    test('Элементы корректно меняются', () => {
      const initialStateWithIngredients = {
        ingredients: [
          { ...ingredientMainMock, id: 'id-1' },
          { ...ingredientSauceMock, id: 'id-2' }
        ],
        bun: null
      };

      const newState = burgerConstructorSlice.reducer(
        initialStateWithIngredients,
        burgerConstructorActions.swapIngredient(0, 1)
      );

      expect(newState.ingredients).toEqual([
        { ...ingredientSauceMock, id: 'id-2' },
        { ...ingredientMainMock, id: 'id-1' }
      ]);
    });

    test('Ингридиент не меняет расположение', () => {
      const initialStateWithIngredients = {
        ingredients: [
          { ...ingredientMainMock, id: 'id-1' },
          { ...ingredientSauceMock, id: 'id-2' }
        ],
        bun: null
      };

      const newState = burgerConstructorSlice.reducer(
        initialStateWithIngredients,
        burgerConstructorActions.swapIngredient(0, 0)
      );

      expect(newState.ingredients).toEqual([
        { ...ingredientMainMock, id: 'id-1' },
        { ...ingredientSauceMock, id: 'id-2' }
      ]);
    });
  });

  describe('removeIngredient', () => {
    test('Ингредиент корректно удаляется по id', () => {
      const initialStateWithIngredients = {
        ingredients: [
          { ...ingredientMainMock, id: 'id-1' },
          { ...ingredientSauceMock, id: 'id-2' }
        ],
        bun: null
      };

      const newState = burgerConstructorSlice.reducer(
        initialStateWithIngredients,
        burgerConstructorActions.removeIngredient({
          ...ingredientSauceMock,
          id: 'id-2'
        })
      );

      expect(newState.ingredients).toEqual([
        { ...ingredientMainMock, id: 'id-1' }
      ]);
    });

    test('Ничего не происходит, если ингредиент с таким id не найден', () => {
      const initialStateWithIngredients = {
        ingredients: [
          { ...ingredientMainMock, id: 'id-1' },
          { ...ingredientSauceMock, id: 'id-2' }
        ],
        bun: null
      };

      const newState = burgerConstructorSlice.reducer(
        initialStateWithIngredients,
        burgerConstructorActions.removeIngredient({
          ...ingredientMainMock,
          id: '0'
        })
      );

      expect(newState.ingredients).toEqual([
        { ...ingredientMainMock, id: 'id-1' },
        { ...ingredientSauceMock, id: 'id-2' }
      ]);
    });
  });

  describe('clearAll', () => {
    test('Конструктор полностью очищается: удаляются все ингредиенты и булка', () => {
      const filledState = {
        ingredients: [
          { ...ingredientMainMock, id: 'id-1' },
          { ...ingredientSauceMock, id: 'id-2' }
        ],
        bun: { ...ingredientBunMock, id: 'id-bun' }
      };

      const newState = burgerConstructorSlice.reducer(
        filledState,
        burgerConstructorActions.clearAll()
      );

      expect(newState.ingredients).toEqual([]);
      expect(newState.bun).toBeNull();
    });
  });
});
