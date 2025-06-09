import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div>
      <p>auth layout</p>
      <Outlet />
    </div>
  );
};
