import { Button, Flex, Form, Input } from 'antd';

export const LoginForm = () => {
  const [form] = Form.useForm();

  // добавить адаптив

  return (
    <div style={{ width: '100%' }}>
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Form name="login-form" layout="vertical" style={{ maxWidth: 360 }}>
          <Form.Item label="Email" name="login-email-input">
            <Input type="email" placeholder="Введите email" />
          </Form.Item>
          <Form.Item label="Password" name="login-password-input">
            <Input type="password" placeholder="****************" />
          </Form.Item>
          <Form.Item name="login-submit-btn">
            <Button>Login</Button>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};
