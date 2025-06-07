import { useState } from 'react';

import { ERROR } from '../../constants/error';
import { createTodo } from '../../api/todos';

import { Flex, Form, Input, Button, message } from 'antd';
import { FileAddFilled } from '@ant-design/icons';

interface TodoAddFormProps {
  updateData: () => void;
}

const addTodoInputRules = [
  { required: true, message: 'Обязательное поле!' },
  {
    min: 2,
    message: ERROR.MIN_LENGTH_2,
  },
  {
    max: 64,
    message: ERROR.MAX_LENGTH_56,
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
      onSuccessEditMessage();
      await createTodo(text);
    } catch (err) {
    } finally {
      form.resetFields();
      setIsLoading(false);
      await updateData();
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
