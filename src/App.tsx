import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Employees from './components/Employees';
import Upload from './components/FileUpload';
import Login from './components/Login';
import PrivateRouter from './Router/PrivateRouter';
import { logout, selectAuth } from './store/slices/Main';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector(selectAuth);
  return (
    <>
      {user && (
        <header>
          <Link className={`${pathname === '/' ? 'active' : ''}`} to="/">
            Home
          </Link>
          <Link
            className={`${pathname.includes('employees') ? 'active' : ''}`}
            to="employees"
          >
            Employees
          </Link>
          <Link
            className={`${pathname.includes('upload') ? 'active' : ''}`}
            to="upload"
          >
            Upload
          </Link>
          {user != null && (
            <span onClick={() => dispatch(logout())}>Logout</span>
          )}
        </header>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="employees"
          element={
            <PrivateRouter>
              <Employees />
            </PrivateRouter>
          }
        />
        <Route
          path="upload"
          element={
            <PrivateRouter>
              <Upload
                title="Image Upload"
                maxFileSize={500000}
                multiple
                accept="image/png, image/jpeg, image/jpg"
              />
            </PrivateRouter>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRouter>
              <Navigate to="employees" />
            </PrivateRouter>
          }
        />
      </Routes>
    </>
  );
}

export default App;
