import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <div>
      <aside>
        <ul>
          <li>12</li>
        </ul>
      </aside>
      <Outlet />
    </div>
  );
}
