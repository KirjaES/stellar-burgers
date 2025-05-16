import {
  orderSlice,
  fetchOrderByNumber,
  fetchUserOrders,
  makeOrder
} from '../slices/order-slice';
import orderMock from '../__mocks__/order.json';
import userOrdersMock from '../__mocks__/user-orders.json';
import makeOrderMock from '../__mocks__/make-order.json';

const initialState = {
  orderByNumber: undefined,
  userOrders: [],
  constructorOrder: null,
  loading: {
    orderByNumber: true,
    userOrders: true,
    constructorOrder: false
  },
  error: {
    orderByNumber: undefined,
    userOrders: undefined,
    constructorOrder: undefined
  }
};

describe('orderSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchOrderByNumber', () => {
    it('Должен правильно обрабатывать ожидание', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.orderByNumber).toBe(true);
      expect(state.error.orderByNumber).toBeUndefined();
    });

    it('Должен правильно обрабатывать успешный ответ', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: orderMock
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.orderByNumber).toBe(false);
      expect(state.orderByNumber).toEqual(orderMock.orders[0]);
      expect(state.error.orderByNumber).toBeUndefined();
    });

    it('Должен правильно обрабатывать ошибку', () => {
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: { message: 'error mock' }
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.orderByNumber).toBe(false);
      expect(state.error.orderByNumber).toBe('error mock');
    });
  });

  describe('fetchUserOrders', () => {
    it('Должен правильно обрабатывать ожидание', () => {
      const action = { type: fetchUserOrders.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.userOrders).toBe(true);
      expect(state.error.userOrders).toBeUndefined();
    });

    it('Должен правильно обрабатывать успешный ответ', () => {
      const action = {
        type: fetchUserOrders.fulfilled.type,
        payload: userOrdersMock.orders
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.userOrders).toBe(false);
      expect(state.userOrders).toEqual(userOrdersMock.orders);
      expect(state.error.userOrders).toBeUndefined();
    });

    it('Должен правильно обрабатывать ошибку', () => {
      const action = {
        type: fetchUserOrders.rejected.type,
        error: { message: 'error mock' }
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.userOrders).toBe(false);
      expect(state.error.userOrders).toBe('error mock');
    });
  });

  describe('makeOrder', () => {
    it('Должен правильно обрабатывать ожидание', () => {
      const action = { type: makeOrder.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.constructorOrder).toBe(true);
      expect(state.error.constructorOrder).toBeUndefined();
    });

    it('Должен правильно обрабатывать успешный ответ', () => {
      const action = {
        type: makeOrder.fulfilled.type,
        payload: makeOrderMock
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.constructorOrder).toBe(false);
      expect(state.constructorOrder).toEqual(makeOrderMock.order);
      expect(state.error.constructorOrder).toBeUndefined();
    });

    it('Должен правильно обрабатывать ошибку', () => {
      const action = {
        type: makeOrder.rejected.type,
        error: { message: 'error mock' }
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.loading.constructorOrder).toBe(false);
      expect(state.error.constructorOrder).toBe('error mock');
    });
  });

  test('clearConstructorOrder', () => {
    const prevState = {
      ...initialState,
      constructorOrder: makeOrderMock.order,
      loading: {
        ...initialState.loading,
        constructorOrder: true
      }
    };

    const action = orderSlice.actions.clearConstructorOrder();
    const state = orderSlice.reducer(prevState, action);

    expect(state.constructorOrder).toBeNull();
    expect(state.loading.constructorOrder).toBe(false);
  });
});
