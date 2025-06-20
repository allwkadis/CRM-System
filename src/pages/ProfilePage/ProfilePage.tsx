import { useEffect } from 'react';
import { Typography, Flex, Card, Button, App, Descriptions, Space, Avatar } from 'antd';
import { LogoutOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { getProfileInfoAction } from '../../store/actions/getProfileData';
import { userSlice } from '../../store/slices/userSlice';
import { authUserLogout } from '../../api/auth';
import { tokenManager } from '../../utils/TokenManager';

export const ProfilePage = () => {
  const { notification } = App.useApp();
  const { isLoading, profileData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfileInfoAction());
  }, []);

  const onLogoutHanddler = async () => {
    try {
      await authUserLogout();
      tokenManager.removeTokens();
      dispatch(userSlice.actions.logout());
      navigate('/auth/login');
    } catch {
      notification.error({
        message: 'Ошибка',
        description: 'Произошла ошибка при выходе из системы',
      });
    }
  };

  if (isLoading) return <div>loading</div>;

  return (
    <Flex style={{ height: '100%', width: '100%' }} justify="center" align="center">
      <Card
        style={{ maxWidth: 800, width: '100%' }}
        title={
          <Space>
            <Avatar size={24} icon={<UserOutlined />} />
            <Typography.Title level={4} style={{ margin: 0 }}>
              Профиль
            </Typography.Title>
          </Space>
        }
        actions={[
          <Button danger icon={<LogoutOutlined />} onClick={onLogoutHanddler}>
            Выйти
          </Button>,
        ]}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item
            label={
              <Typography>
                <UserOutlined /> Username
              </Typography>
            }
          >
            {profileData?.username}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <Typography>
                <MailOutlined /> Email
              </Typography>
            }
          >
            {profileData?.email}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <Typography>
                <PhoneOutlined /> Phone
              </Typography>
            }
          >
            {profileData?.phoneNumber || <Typography style={{ color: '#bfbfbf' }}>Не указан</Typography>}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Flex>
  );
};
