import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { App } from 'antd';

import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { ROUTES } from './constants/routes';
import { TodoPage } from './pages/TodoPage/TodoPage';

import './styles/index.scss';
import MainLayout from './layouts/MainLayout/MainLayout';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { RegisterForm } from './layouts/AuthLayout/RegisterForm/RegisterForm';
import { LoginForm } from './layouts/AuthLayout/LoginForm/LoginForm';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

const router = createBrowserRouter([
  {
    path: ROUTES.BASE_URL,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.TODO_PAGE} replace />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: ROUTES.TODO_PAGE,
        element: <TodoPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.AUTH,
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.LOGIN} replace />,
          },
          {
            path: ROUTES.LOGIN,
            element: <LoginForm />,
          },
          {
            path: ROUTES.REGISTER,
            element: <RegisterForm />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>,
);
