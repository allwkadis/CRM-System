import { App, Button, Form, Input } from 'antd';
import {
  REGISTER_LOGIN_MAX_LENGTH,
  REGISTER_LOGIN_MIN_LENGTH,
  REGISTER_PASSWORD_MAX_LENGTH,
  REGISTER_PASSWORD_MIN_LENGTH,
  REGISTER_USERNAME_MAX_LENGTH,
  REGISTER_USERNAME_MIN_LENGTH,
} from '../../../constants/auth';

import { userRegister } from '../../../api/auth';
import { useNavigate } from 'react-router';

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const onSuccesRegisterNotification = () => {
    notification.success({
      message: 'Успешно',
      description: 'Успешная регистрация',
    });
  };
  const onErrorRegisterNotification = () => {
    notification.error({
      message: 'Ошибка',
      description: 'При регистрации произошла ошибка',
    });
  };

  const onRegisterErrorFinishHandler = () => onErrorRegisterNotification();

  const onRegisterFinishHandler = async () => {
    const username = form.getFieldValue('register-username-input');
    const login = form.getFieldValue('register-login-input');
    const password = form.getFieldValue('register-password-input');
    const email = form.getFieldValue('register-email-input');
    const phoneNumber = form.getFieldValue('register-phone-input');

    try {
      await userRegister({
        email: email,
        login: login,
        password: password,
        phoneNumber: phoneNumber,
        username: username,
      });
      form.resetFields();
      onSuccesRegisterNotification();
      navigate('/auth/login');
    } catch {
      onErrorRegisterNotification;
      return;
    }
  };

  return (
    <Form
      name="register-form"
      layout="vertical"
      onFinish={onRegisterFinishHandler}
      onFinishFailed={onRegisterErrorFinishHandler}
      form={form}
      style={{ width: '100%', maxWidth: 376, padding: 12 }}
    >
      <Form.Item
        label="Имя пользователя"
        name="register-username-input"
        rules={[
          {
            required: true,
            message: 'Имя пользователя обязательное поле!',
          },
          {
            min: REGISTER_USERNAME_MIN_LENGTH,
            message: `Имя пользователя не может быть меньше ${REGISTER_USERNAME_MIN_LENGTH}`,
          },
          {
            max: REGISTER_USERNAME_MAX_LENGTH,
            message: `Имя пользователя не может быть меньше ${REGISTER_USERNAME_MAX_LENGTH}`,
          },
        ]}
      >
        <Input placeholder="Введите имя пользователя" />
      </Form.Item>
      <Form.Item
        label="Логин"
        name="register-login-input"
        rules={[
          {
            required: true,
            message: 'Логин обязательное поле!',
          },
          {
            min: REGISTER_LOGIN_MIN_LENGTH,
            message: `Логин не может быть меньше ${REGISTER_LOGIN_MIN_LENGTH}`,
          },
          {
            max: REGISTER_LOGIN_MAX_LENGTH,
            message: `Логин не может быть больше ${REGISTER_LOGIN_MAX_LENGTH}`,
          },
        ]}
      >
        <Input placeholder="Введите логин" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="register-password-input"
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
            max: REGISTER_PASSWORD_MAX_LENGTH,
            message: `Пароль не может быть больше ${REGISTER_PASSWORD_MIN_LENGTH}`,
          },
        ]}
      >
        <Input.Password placeholder="***********" />
      </Form.Item>
      <Form.Item
        label="Повторите пароль"
        name="register-confirm-password-input"
        rules={[
          { required: true, message: 'Повторите пароль обязательное поле!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('register-password-input') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="***********" />
      </Form.Item>
      <Form.Item
        label="Почтовый адрес"
        name="register-email-input"
        rules={[
          { required: true, message: 'Почтовый адрес обязательное поле!' },
          {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Некорректный формат email! Пример: user@example.com',
          },
        ]}
      >
        <Input placeholder="Введите почтовый адрес" />
      </Form.Item>
      <Form.Item
        label="Телефон"
        name="register-phone-input"
        rules={[
          { pattern: /^\+?[0-9\s\-\(\)]{10,}$/, message: 'Некорректный формат номера! Пример: +7 (123) 456-7890' },
        ]}
      >
        <Input placeholder="Введите номер телефона" type="tel" />
      </Form.Item>
      <Form.Item name="login-submit-btn">
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
