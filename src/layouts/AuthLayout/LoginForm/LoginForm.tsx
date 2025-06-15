import { App, Button, Form, Input } from 'antd';
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
    const login = form.getFieldValue('login-loginName-input');
    const password = form.getFieldValue('login-password-input');

    try {
      // await dispatch(SignIn({ login, password })).unwrap();
      const { data } = await authUserLogin({ login, password });
      console.log(data.accessToken)
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
      <Form.Item
        label="Логин"
        name="login-loginName-input"
        rules={[{ required: true, message: 'Логин обязательное поле!' }]}
      >
        <Input placeholder="Введите логин" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="login-password-input"
        rules={[
          {
            required: true,
            message: 'Пароль обязательное поле!',
          },
        ]}
      >
        <Input.Password placeholder="****************" />
      </Form.Item>
      <Form.Item name="login-submit-btn">
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
      <Form.Item name="login-submit-btn">
        <Link to={'/auth/register'}>
          <Button style={{ width: '100%' }} type="link">
            Зарегистрироваться
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};
