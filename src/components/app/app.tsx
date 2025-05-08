import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUser } from '../../services/slices/user-slice';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-route/protected-route';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { OrderModal } from '../order-modal/order-modal';
import { IngredientModal } from '../ingredient-modal/ingredient-modal';

const App = () => {
  const dispatcher = useDispatch();
  const location = useLocation();
  const prevLocationState = location.state?.background;

  useEffect(() => {
    dispatcher(fetchUser());
    dispatcher(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute isOnlyAnonymous>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isOnlyAnonymous>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isOnlyAnonymous>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute isOnlyAnonymous>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        {prevLocationState ? (
          <>
            <Route path='/feed/:number' element={<Feed />} />
            <Route path='/ingredients/:id' element={<ConstructorPage />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
          </>
        ) : (
          <>
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </>
        )}
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {prevLocationState && (
        <Routes>
          <Route path='/feed/:number' element={<OrderModal />} />
          <Route path='/ingredients/:id' element={<IngredientModal />} />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
