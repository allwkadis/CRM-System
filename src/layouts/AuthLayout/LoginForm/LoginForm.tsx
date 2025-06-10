import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { Link } from 'react-router';
import { ROUTES } from '../../../constants/routes';

export const LoginForm = () => {
  const [form] = Form.useForm();

  return (
    <Form name="login-form" layout="vertical" style={{ width: '100%', maxWidth: 376, padding: 12 }}>
      <Form.Item label="Email" name="login-email-input">
        <Input type="email" placeholder="Введите email" />
      </Form.Item>
      <Form.Item label="Password" name="login-password-input">
        <Input type="password" placeholder="****************" />
      </Form.Item>
      <Flex justify="space-between" align="center">
        <Form.Item>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>
        <Form.Item>
          <Link to={'/reset_password'}>Забыли пароль?</Link>
        </Form.Item>
      </Flex>
      <Form.Item name="login-submit-btn">
        <Button style={{ width: '100%' }} type="primary">
          Войти
        </Button>
      </Form.Item>
      <Form.Item name="login-submit-btn">
        <Link to={'/auth/register'}>
          <Button style={{ width: '100%' }} type="primary">
            Зарегистрироваться
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};
