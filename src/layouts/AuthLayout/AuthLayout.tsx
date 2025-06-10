import { Flex, Layout } from 'antd';
import { Outlet } from 'react-router';

import authImage from '../../assets/auth_left.png';

export const AuthLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={{ width: '100%', height: '100%' }}>
        <Flex>
          <img src={authImage} style={{ height: '100vh', width: '60%' }} alt="auth_image" />
          <div style={{ width: '100%' }}>
            <Flex align="center" justify="center" style={{ height: '100vh' }}>
              <Outlet />
            </Flex>
          </div>
        </Flex>
      </Layout.Content>
    </Layout>
  );
};
