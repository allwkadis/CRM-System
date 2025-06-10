import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { Link } from 'react-router';
import { ROUTES } from '../../../constants/routes';

export const LoginForm = () => {
  const [form] = Form.useForm();

  return (
    <Form name="login-form" layout="vertical" style={{ width: '100%', maxWidth: 376, padding: 12 }}>
      <Form.Item
        label="Почта"
        name="login-email-input"
        rules={[
          { required: true, message: 'Почтовый адрес обязательное поле!' },
          {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Некорректный формат email! Пример: user@example.com',
          },
        ]}
      >
        <Input type="email" placeholder="Введите email" />
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
        <Button style={{ width: '100%' }} type="primary">
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
