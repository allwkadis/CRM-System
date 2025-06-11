import { useState } from 'react';

import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from '../../constants/todo';
import { createTodo } from '../../api/todos';

import { Flex, Form, Input, Button, App } from 'antd';
import { FileAddFilled } from '@ant-design/icons';

interface TodoAddFormProps {
  updateData: () => void;
}

//trest321


const addTodoInputRules = [
  { required: true, message: 'Обязательное поле!' },
  {
    min: TODO_TITLE_MIN_LENGTH,
    message: `Текст задачи не может быть меньше ${TODO_TITLE_MIN_LENGTH}`,
  },
  {
    max: TODO_TITLE_MAX_LENGTH,
    message: `Текст задачи не может быть меньше ${TODO_TITLE_MAX_LENGTH}`,
  },
];

export const TodoAddForm = ({ updateData }: TodoAddFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { notification } = App.useApp();

  const onSuccessAddTodo = () => {
    notification.success({
      message: 'Успешно',
      description: 'Задача успешно добавлена',
    });
  };

  const onErrorAddTodoMessage = () => {
    notification.error({
      message: 'Ошибка',
      description: 'При добавлении задачи произошла ошибка',
    });
  };

  const onAddTaskFinishHandler = async () => {
    try {
      const text = form.getFieldValue('inputField');
      setIsLoading(true);
      await createTodo(text);
      onSuccessAddTodo();
    } catch (err) {
      onErrorAddTodoMessage();
    } finally {
      form.resetFields();
      setIsLoading(false);
      updateData();
    }
  };

  return (
    <Form
      layout="inline"
      onFinish={onAddTaskFinishHandler}
      onFinishFailed={onErrorAddTodoMessage}
      form={form}
      style={{ padding: 12 }}
    >
      <Flex gap="middle" style={{ width: '100%' }}>
        <Form.Item name="inputField" style={{ flex: 1 }} rules={addTodoInputRules}>
          <Input placeholder="Task be done..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} icon={<FileAddFilled />}>
            Add
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
