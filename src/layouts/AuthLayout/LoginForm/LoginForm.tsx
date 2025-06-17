import { App, Button, Flex, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';

import { authUserLogin } from '../../../api/auth';
import { useAppDispatch } from '../../../store/store';
import { userSlice } from '../../../store/slices/userSlice';
import { tokenManager } from '../../../utils/TokenManager';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const { notification } = App.useApp();

  const onErrorLoginNotification = () => {
    notification.error({
      message: 'Ошибка',
      description: 'Неверный логин или пароль',
    });
  };

  const onSuccessLoginFinish = async () => {
    const login = form.getFieldValue('login');
    const password = form.getFieldValue('password');

    try {
      const { data } = await authUserLogin({ login, password });
      tokenManager.setAccessToken(data.accessToken);
      tokenManager.setRefreshToken(data.refreshToken);
      dispatch(userSlice.actions.login());
      navigate('/');
    } catch {
      onErrorLoginNotification();
    }
  };

  return (
    <Form
      form={form}
      name="login-form"
      layout="vertical"
      style={{ width: '100%', maxWidth: 376, padding: 12 }}
      onFinish={onSuccessLoginFinish}
    >
      <Form.Item label="Логин" name="login" rules={[{ required: true, message: 'Логин обязательное поле!' }]}>
        <Input placeholder="Введите логин" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: 'Пароль обязательное поле!',
          },
        ]}
      >
        <Input.Password placeholder="****************" />
      </Form.Item>
      <Form.Item name="submit-btn">
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
      <Form.Item name="submit-btn">
        <Link to={'/auth/register'}>
          <Button style={{ width: '100%' }} type="link">
            Зарегистрироваться
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};
