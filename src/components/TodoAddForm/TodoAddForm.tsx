import { useState } from 'react';

import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from '../../constants/todo';
import { createTodo } from '../../api/todos';

import { Flex, Form, Input, Button, message } from 'antd';
import { FileAddFilled } from '@ant-design/icons';

interface TodoAddFormProps {
  updateData: () => void;
}

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
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onSuccessEditMessage = () => {
    messageApi.success({
      content: 'Задача успешно добавлена',
      style: {
        position: 'absolute',
        right: 10,
      },
    });
  };

  const onErrorAddTodoMessage = () => {
    messageApi.error({
      content: 'Ошибка при добавлении задачи',
      style: {
        position: 'absolute',
        right: 10,
      },
    });
  };

  const onAddTaskFinishHandler = async () => {
    try {
      const text = form.getFieldValue('inputField');
      setIsLoading(true);
      await createTodo(text);
      onSuccessEditMessage();
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
      {contextHolder}
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
