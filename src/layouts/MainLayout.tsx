import { Layout } from 'antd';
import { Outlet } from 'react-router';
import { SideBar } from '../components/SideBar/SideBar';

import styles from './MainLayout.module.scss';

export default function MainLayout() {
  return (
    <Layout hasSider className={styles.Wrapper}>
      <SideBar />
      <Layout>
        <Layout.Content className={styles.Content}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
