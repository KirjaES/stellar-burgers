import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TFeed = Pick<TOrdersData, 'total' | 'totalToday'>;

const initialState = {
  orders: [] as TOrder[],
  feed: {
    total: 0,
    totalToday: 0
  } as TFeed,
  isLoading: true,
  error: undefined as string | undefined
};

export const fetchFeeds = createAsyncThunk('feeds/fetch', getFeedsApi);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feed = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
        state.isLoading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
  selectors: {
    getOrders: (state) => state.orders,
    getFeed: (state) => state.feed,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error
  }
});

export const feedsSelectors = feedsSlice.selectors;
