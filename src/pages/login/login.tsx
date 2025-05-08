import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, userSelectors } from '../../services/slices/user-slice';
import { ingredientsSelectors } from '../../services/slices/ingredients-slice';
import { Preloader } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginError = useSelector(userSelectors.loginError);
  const isLoadingLogin = useSelector(userSelectors.isLoadingLogin);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatcher(
      loginUser({
        email,
        password
      })
    ).then(() => {
      if (locationState?.from) {
        navigate(locationState.from);
      }
    });
  };

  if (isLoadingLogin) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={loginError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
