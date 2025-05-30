import { Layout } from 'antd';
import { Outlet } from 'react-router';
import { SideBar } from '../components/SideBar/SideBar';
import { Content } from 'antd/es/layout/layout';

export default function MainLayout() {
  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
