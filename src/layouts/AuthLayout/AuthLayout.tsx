import { Flex, Layout } from 'antd';
import { Outlet } from 'react-router';

import authImage from '../../assets/auth_left.png';

export const AuthLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={{ maxWidth: 1240, width: '100%', height: '100%' }}>
        <Flex>
          <img src={authImage} style={{ height: '100vh', width: '60%' }} alt="auth_image" />
          <Outlet />
        </Flex>
      </Layout.Content>
    </Layout>
  );
};
