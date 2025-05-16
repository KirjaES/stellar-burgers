import {
  userSlice,
  fetchUser,
  registerUser,
  loginUser,
  updateUser,
  logout
} from '../slices/user-slice';
import userMock from '../__mocks__/user.json';
import registerUserMock from '../__mocks__/register-user.json';
import loginUserMock from '../__mocks__/login-user.json';

const initialState = {
  isAuthorized: false,
  user: {
    name: '',
    email: ''
  },
  isLoading: true,
  error: undefined,
  isLoadingLogin: false,
  loginError: undefined
};

describe('userSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUser', () => {
    it('Должен правильно обрабатывать ожидание', () => {
      const action = { type: fetchUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('Должен правильно обрабатывать успешный ответ', () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: userMock
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(userMock.user);
      expect(state.error).toBeUndefined();
    });

    it('Должен правильно обрабатывать ошибку', () => {
      const action = {
        type: fetchUser.rejected.type,
        error: { message: 'error mock' }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('error mock');
    });
  });

  describe('registerUser', () => {
    it('Должен правильно обрабатывать ожидание', () => {
      const action = { type: registerUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('Должен правильно обрабатывать успешный ответ', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: registerUserMock
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(registerUserMock.user);
      expect(state.error).toBeUndefined();
    });

    it('Должен правильно обрабатывать ошибку', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'error mock' }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('error mock');
    });
  });

  describe('loginUser', () => {
    it('Должен правильно обрабатывать ожидание', () => {
      const action = { type: loginUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoadingLogin).toBe(true);
      expect(state.loginError).toBeUndefined();
    });

    it('Должен правильно обрабатывать успешный ответ', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: loginUserMock
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoadingLogin).toBe(false);
      expect(state.user).toEqual(loginUserMock.user);
      expect(state.loginError).toBeUndefined();
    });

    it('Должен правильно обрабатывать ошибку', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'error mock' }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoadingLogin).toBe(false);
      expect(state.loginError).toBe('error mock');
    });
  });

  describe('updateUser', () => {
    it('Должен правильно обрабатывать ожидание', () => {
      const action = { type: updateUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('Должен правильно обрабатывать успешный ответ', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: userMock
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(userMock.user);
    });

    it('Должен правильно обрабатывать ошибку', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'mock error' }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('mock error');
    });
  });

  describe('logout', () => {
    it('Должен правильно обрабатывать ожидание', () => {
      const action = { type: logout.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('Должен правильно обрабатывать успешный ответ', () => {
      const preState = {
        ...initialState,
        user: { name: 'name', email: 'email' },
        isAuthorized: true
      };

      const action = { type: logout.fulfilled.type };
      const state = userSlice.reducer(preState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual({ name: '', email: '' });
      expect(state.isAuthorized).toBe(false);
    });

    it('Должен правильно обрабатывать ошибку', () => {
      const action = {
        type: logout.rejected.type,
        error: { message: 'mock error' }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('mock error');
    });
  });
});
