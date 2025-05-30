import { useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { ROUTES } from '../../constants/routes';
import { Menu } from 'antd';
import { Link } from 'react-router';

export const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { key: 'profile', label: <Link to={ROUTES.PROFILE}>Профиль</Link>, icon: '🗒️', title: 'Профиль' },
    { key: 'todo', label: <Link to={ROUTES.TODO_PAGE}>Todo</Link>, icon: '📝', title: 'Todo' },
  ];

  const isCollapsedToggle = () => setIsCollapsed((prev) => !prev);

  return (
    <Sider collapsed={isCollapsed} theme="dark" collapsible breakpoint="lg" width={300} onCollapse={isCollapsedToggle}>
      <Menu items={menuItems} theme="dark" inlineCollapsed={!isCollapsed} />
    </Sider>
  );
};
