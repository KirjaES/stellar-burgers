import store, { rootReducer } from '../store';

const targetState = {
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  feeds: {
    error: undefined,
    feed: {
      total: 0,
      totalToday: 0
    },
    isLoading: true,
    orders: []
  },
  ingredients: {
    error: undefined,
    ingredients: [],
    isLoading: true
  },
  order: {
    constructorOrder: null,
    error: {
      constructorOrder: undefined,
      orderByNumber: undefined,
      userOrders: undefined
    },
    loading: {
      constructorOrder: false,
      orderByNumber: true,
      userOrders: true
    },
    orderByNumber: undefined,
    userOrders: []
  },
  user: {
    error: undefined,
    isAuthorized: false,
    isLoading: true,
    isLoadingLogin: false,
    loginError: undefined,
    user: {
      email: '',
      name: ''
    }
  }
};

describe('store', () => {
  test('Должен правильно создавать начальный стейт', () => {
    expect(store.getState()).toEqual(targetState);
  });

  test.each(Object.keys(rootReducer) as Array<keyof typeof rootReducer>)(
    '%s должен корректно возвращать исходный стейт и никак не обрабатывать неизвестный экшен',
    (sliceName) => {
      const state = rootReducer[sliceName](undefined, {
        type: 'UNKNOWN_ACTION'
      });
      expect(state).toEqual(targetState[sliceName]);
    }
  );
});
