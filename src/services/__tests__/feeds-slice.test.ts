import { feedsSlice, fetchFeeds } from '../slices/feeds-slice';
import feedsMock from '../__mocks__/feeds.json';

const initialState = {
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  isLoading: true,
  error: undefined
};

describe('feedsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Должен правильно обрабатывать ожидание', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('Должен правильно обрабатывать успешный ответ', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: feedsMock };
    const state = feedsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(feedsMock.orders);
    expect(state.feed).toEqual({
      total: feedsMock.total,
      totalToday: feedsMock.totalToday
    });
    expect(state.error).toBeUndefined();
  });

  it('Должен правильно обрабатывать ошибку', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'error mock' }
    };
    const state = feedsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error mock');
  });
});
