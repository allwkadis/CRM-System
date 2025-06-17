import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { App } from 'antd';

import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { ROUTES } from './utils/constants/routes';
import { TodoPage } from './pages/TodoPage/TodoPage';

import MainLayout from './layouts/MainLayout/MainLayout';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { RegisterForm } from './layouts/AuthLayout/RegisterForm/RegisterForm';
import { LoginForm } from './layouts/AuthLayout/LoginForm/LoginForm';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Provider } from 'react-redux';

import './styles/index.scss';
import { store } from './store/store';
import { ProtectedRoute } from './layouts/AuthProtectRoute';

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
        element: (
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </StrictMode>,
);
