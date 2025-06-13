import { useState } from 'react';
import { Menu } from 'antd';
import { Link, NavLink } from 'react-router';
import { SnippetsOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

import Sider from 'antd/es/layout/Sider';
import { ROUTES } from '../../utils/constants/routes';
import { useAppDispatch } from '../../config/store/store';
import { Logout } from '../../config/store/slices/AuthSlice/Logout';

export const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useAppDispatch();

  const onLogoutHanddler = async () => {
    try {
      await dispatch(Logout());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch {}
  };

  const menuItems = [
    {
      key: 'profile',
      label: <NavLink to={ROUTES.PROFILE}>Профиль </NavLink>,
      icon: <UserOutlined />,
      title: 'Профиль',
    },
    { key: 'todo', label: <NavLink to={ROUTES.TODO_PAGE}>Todo</NavLink>, icon: <SnippetsOutlined />, title: 'Todo' },
    {
      key: 'logout',
      label: (
        <Link to={'/auth/login'} onClick={onLogoutHanddler}>
          Выйти
        </Link>
      ),
      icon: <LogoutOutlined />,
      title: 'Выйти',
    },
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
