import { Typography, Flex, Card, Button, App, Form, Input, Descriptions, Space, Avatar } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { getProfileInfoAction } from '../../store/actions/getProfileData';
import { LockOutlined, LogoutOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { authUserLogout, authUserResetPassword } from '../../api/auth';
import { tokenManager } from '../../utils/TokenManager';
import { userSlice } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../utils/constants/auth';

export const ProfilePage = () => {
  const { modal, notification } = App.useApp();
  const [form] = Form.useForm();
  const { isLoading, profileData } = useAppSelector((state) => state.auth);
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

  const changePasswordModal = () => {
    const resetPasswordModal = modal.confirm({
      title: 'Изменение пароля',
      closable: true,
      footer: null,
      content: (
        <Form
          layout="vertical"
          form={form}
          onFinishFailed={() => {
            notification.error({
              message: 'Ошибка',
              description: 'Невалидные данные',
            });
          }}
          onFinish={async () => {
            const password = form.getFieldValue('password');
            try {
              await authUserResetPassword(password);
              notification.success({
                message: 'Успешно',
                description: 'Пароль изменен',
              });
              form.resetFields();
              resetPasswordModal.destroy();
            } catch {
              notification.error({
                message: 'Ошибка',
                description: 'При изменении пароль произошла ошибка',
              });
            }
          }}
        >
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Пароль обязательное поле!',
              },
              {
                min: PASSWORD_MIN_LENGTH,
                message: `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH}`,
              },
              {
                max: PASSWORD_MAX_LENGTH,
                message: `Пароль не может быть больше ${PASSWORD_MIN_LENGTH}`,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Повторите пароль"
            name="repeat-password"
            rules={[
              { required: true, message: 'Повторите пароль обязательное поле!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">отправить</Button>
          </Form.Item>
        </Form>
      ),
    });
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
          <Button type="primary" icon={<LockOutlined />} onClick={changePasswordModal}>
            Изменить пароль
          </Button>,
          <Button danger icon={<LogoutOutlined />} onClick={onLogoutHanddler}>
            Выйти
          </Button>,
        ]}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item
            label={
              <span style={{ fontWeight: 'bold' }}>
                <UserOutlined /> Username
              </span>
            }
          >
            {profileData?.username}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span style={{ fontWeight: 'bold' }}>
                <MailOutlined /> Email
              </span>
            }
          >
            {profileData?.email}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span style={{ fontWeight: 'bold' }}>
                <PhoneOutlined /> Phone
              </span>
            }
          >
            {profileData?.phoneNumber || <Typography style={{ color: '#bfbfbf' }}>Not specified</Typography>}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Flex>
  );
};
