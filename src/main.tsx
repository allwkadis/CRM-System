import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { App } from 'antd';

import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { ROUTES } from './constants/routes';
import { TodoPage } from './pages/TodoPage/TodoPage';
import MainLayout from './layouts/MainLayout';

import './styles/index.scss';

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
        path: ROUTES.TODO_PAGE,
        element: <TodoPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
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
