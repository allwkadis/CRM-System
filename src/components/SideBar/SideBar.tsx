import { useState } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router';
import { SnippetsOutlined, UserOutlined } from '@ant-design/icons';

import Sider from 'antd/es/layout/Sider';
import { ROUTES } from '../../utils/constants/routes';

export const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      key: 'profile',
      label: <NavLink to={ROUTES.PROFILE}>Профиль </NavLink>,
      icon: <UserOutlined />,
      title: 'Профиль',
    },
    { key: 'todo', label: <NavLink to={ROUTES.TODO_PAGE}>Todo</NavLink>, icon: <SnippetsOutlined />, title: 'Todo' },
    { key: 'admin', label: <NavLink to={'/admin/users'}>Users</NavLink>, icon: <SnippetsOutlined />, title: 'Users' },
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
