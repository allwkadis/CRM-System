import { Typography, Flex, Card, Descriptions, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { getProfileInfoAction } from '../../store/actions/getProfileData';
import { LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { authUserLogout } from '../../api/auth';
import { tokenManager } from '../../utils/TokenManager';
import { userSlice } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router';

export const ProfilePage = () => {
  const { isLoading, profileData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onLogoutHanddler = async () => {
    try {
      await authUserLogout();
      tokenManager.removeTokens();
      dispatch(userSlice.actions.logout());
      navigate('/auth/login');
    } catch {}
  };

  useEffect(() => {
    dispatch(getProfileInfoAction());
  }, []);

  if (isLoading) return <div>loading</div>;

  return (
    <Flex style={{ height: '100%', width: '100%' }} justify="center" align="center">
      <Card
        style={{ maxWidth: 800, margin: '0 auto' }}
        actions={[
          <Button type="primary" icon={<LockOutlined />} onClick={() => console.log(1)}>
            Изменить пароль
          </Button>,
          <Button danger icon={<LogoutOutlined />} onClick={onLogoutHanddler}>
            Выйти
          </Button>,
        ]}
      >
        <Typography.Title level={3} style={{ marginBottom: '24px' }}>
          Мой профиль
        </Typography.Title>
        {profileData && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Имя пользователя">{profileData?.username}</Descriptions.Item>
            <Descriptions.Item label="Почтовый адрес">{profileData?.email}</Descriptions.Item>
            {profileData?.phoneNumber && (
              <Descriptions.Item label="Телефон">{profileData?.phoneNumber}</Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Card>
    </Flex>
  );
};
