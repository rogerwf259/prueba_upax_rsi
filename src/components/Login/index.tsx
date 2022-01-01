import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  selectAuth,
  selectLoading,
  setCredentials,
  toggleLoading,
} from '../../store/slices/Main';
import Loader from '../Common/Loader';
import CustomButton from '../Common/SubmitButton';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [psw, setPsw] = useState<string>('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectAuth);
  const loading = useSelector(selectLoading);
  const preventCopyPaste = (e: any) => {
    e.preventDefault();
  };
  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(toggleLoading('login'));
    setTimeout(() => {
      if (username === 'user_prueba' && psw === '123456')
        dispatch(setCredentials(username));
      else setError('Incorrect credentials');
      dispatch(toggleLoading('login'));
    }, 2000);
  };
  if (user) return <Navigate to="employees" />;
  return (
    <div id="login-container">
      <h4>Login</h4>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="email@hotmail.com"
          name="username"
          value={username}
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          value={psw}
          onChange={(e) => setPsw(e.target.value)}
        />
        {error !== '' && <span className="form-error">{error}</span>}
        {loading.includes('login') ? (
          <Loader size="small" />
        ) : (
          <CustomButton
            disabled={
              username === '' ||
              username.length < 10 ||
              psw === '' ||
              psw.length < 6
            }
            type="submit"
            className=""
          >
            Log in
          </CustomButton>
        )}
      </form>
    </div>
  );
};

export default Login;
