import { App, Button, Form, Input } from 'antd';

import { Link } from 'react-router';

import { useAppSelector } from '../../../store/store';
import { authUserRegister } from '../../../api/auth';
import { useState } from 'react';
import {
  LOGIN_MAX_LENGTH,
  LOGIN_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../../utils/constants/auth';

export const RegisterForm = () => {
  const [isSuccessRegistration, setIsRegistration] = useState(false);
  const [form] = Form.useForm();

  const { notification } = App.useApp();
  const { isLoading } = useAppSelector((state) => state.user);
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
      await authUserRegister({
        email: email,
        login: login,
        password: password,
        phoneNumber: phoneNumber,
        username: username,
      });
      form.resetFields();
      onSuccesRegisterNotification();
      setIsRegistration(true);
    } catch (err) {
      onErrorRegisterNotification();
    }
  };

  return isSuccessRegistration ? (
    <Link to={'/auth/login'}>перейти на страницу авторизации для входа в систему</Link>
  ) : (
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
            min: USERNAME_MIN_LENGTH,
            message: `Имя пользователя не может быть меньше ${USERNAME_MIN_LENGTH}`,
          },
          {
            max: USERNAME_MAX_LENGTH,
            message: `Имя пользователя не может быть меньше ${USERNAME_MAX_LENGTH}`,
          },
          // ({ getFieldValue }) => ({
          //   validator(_, value) {
          //     if (!value || getFieldValue('register-login-input') !== value) {
          //       return Promise.resolve();
          //     }
          //     return Promise.reject(new Error('Имя пользователя и логин должны быть разными'));
          //   },
          // }),
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
            min: LOGIN_MIN_LENGTH,
            message: `Логин не может быть меньше ${LOGIN_MIN_LENGTH}`,
          },
          {
            max: LOGIN_MAX_LENGTH,
            message: `Логин не может быть больше ${LOGIN_MAX_LENGTH}`,
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
            min: PASSWORD_MIN_LENGTH,
            message: `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH}`,
          },
          {
            max: PASSWORD_MAX_LENGTH,
            message: `Пароль не может быть больше ${PASSWORD_MAX_LENGTH}`,
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
        rules={[{ pattern: /^\+?[0-9\s\-\(\)]{10,}$/, message: 'Некорректный формат номера! Пример: +7(123)456-7890' }]}
      >
        <Input placeholder="Введите номер телефона" type="tel" />
      </Form.Item>
      <Form.Item name="login-submit-btn">
        <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={isLoading}>
          Зарегистрироваться
        </Button>
      </Form.Item>
      <Form.Item>
        <Button style={{ width: '100%' }} type="link" loading={isLoading}>
          <Link to={'/auth/login'}>Уже есть аккаунт?</Link>
        </Button>
      </Form.Item>
    </Form>
  );
};
