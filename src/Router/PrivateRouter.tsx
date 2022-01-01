import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from '../store/slices/Main';

const PrivateRouter: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const user = useSelector(selectAuth);
  if (user) return children;
  return <Navigate to="/" />;
};

export default PrivateRouter;
