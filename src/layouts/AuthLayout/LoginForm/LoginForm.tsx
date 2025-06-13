import { App, Button, Checkbox, Flex, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../config/store/store';
import { SignIn } from '../../../config/actions/authActions';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const { notification } = App.useApp();
  const { isLoading } = useAppSelector((state) => state.auth);

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
      await dispatch(SignIn({ login, password })).unwrap();
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
        <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={isLoading}>
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
