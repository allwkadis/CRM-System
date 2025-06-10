import { App, Button, Checkbox, Flex, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';
import { authUserLogin } from '../../../api/auth';

export const LoginForm = () => {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const onErrorLoginNotification = () => {
    notification.error({
      message: 'Ошибка',
      description: 'Неверные логин или пароль',
    });
  };

  const onSuccessLoginFinish = async () => {
    const login = form.getFieldValue('login-loginName-input');
    const password = form.getFieldValue('login-password-input');

    try {
      const { data } = await authUserLogin({ login, password });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      form.resetFields();
      navigate('/');
    } catch (err) {
      console.log(1);
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
      <Flex justify="space-between" align="center">
        <Form.Item>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>
        <Form.Item>
          <Link to={'/auth/reset_password'}>
            <Button type="link">Забыли пароль?</Button>
          </Link>
        </Form.Item>
      </Flex>
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
