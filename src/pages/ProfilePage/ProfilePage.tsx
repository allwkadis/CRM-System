import { Typography, Flex, Card, Descriptions, Button, App, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { getProfileInfoAction } from '../../store/actions/getProfileData';
import { LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { authUserLogout, authUserResetPassword } from '../../api/auth';
import { tokenManager } from '../../utils/TokenManager';
import { userSlice } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router';
import { REGISTER_PASSWORD_MAX_LENGTH, REGISTER_PASSWORD_MIN_LENGTH } from '../../utils/constants/auth';

export const ProfilePage = () => {
  const { modal, notification } = App.useApp();
  const [form] = Form.useForm();
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
              await authUserResetPassword({ password });
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
                min: REGISTER_PASSWORD_MIN_LENGTH,
                message: `Пароль не может быть меньше ${REGISTER_PASSWORD_MIN_LENGTH}`,
              },
              {
                max: REGISTER_PASSWORD_MAX_LENGTH, // поменять название констнт
                message: `Пароль не может быть больше ${REGISTER_PASSWORD_MIN_LENGTH}`,
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

  useEffect(() => {
    dispatch(getProfileInfoAction());
  }, []);

  if (isLoading) return <div>loading</div>;

  return (
    <Flex style={{ height: '100%', width: '100%' }} justify="center" align="center">
      <Card
        style={{ maxWidth: 800, width: '100%' }}
        actions={[
          <Button type="primary" icon={<LockOutlined />} onClick={changePasswordModal}>
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
          <Form>
            <Form.Item label="Имя пользователя">
              <Input />
            </Form.Item>
            <Form.Item label="Почтовый адрес">
              <Input />
            </Form.Item>
          </Form>
        )}
      </Card>
    </Flex>
  );
};
