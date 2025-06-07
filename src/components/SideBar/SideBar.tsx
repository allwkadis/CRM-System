import { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router';
import { SnippetsOutlined, UserOutlined } from '@ant-design/icons';

import Sider from 'antd/es/layout/Sider';
import { ROUTES } from '../../constants/routes';

export const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { key: 'profile', label: <Link to={ROUTES.PROFILE}>Профиль </Link>, icon: <UserOutlined />, title: 'Профиль' },
    { key: 'todo', label: <Link to={ROUTES.TODO_PAGE}>Todo</Link>, icon: <SnippetsOutlined />, title: 'Todo' },
  ];

  const isCollapsedToggle = () => setIsCollapsed((prev) => !prev);

  return (
    <Sider
      collapsed={isCollapsed}
      theme="dark"
      collapsible
      breakpoint="lg"
      width={300}
      collapsedWidth={60}
      onCollapse={isCollapsedToggle}
    >
      <Menu items={menuItems} theme="dark" mode="inline" inlineCollapsed={false} />
    </Sider>
  );
};
