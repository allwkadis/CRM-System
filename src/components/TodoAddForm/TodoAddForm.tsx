import { useState } from 'react';

import { ERROR } from '../../constants/error';
import { createTodo } from '../../api/todos';

import { Flex, Form, Input, Button } from 'antd';
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
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onAddTaskFinishHandler = async () => {
    const text = form.getFieldValue('inputField');
    await setIsLoading(true);
    await createTodo(text);
    await setIsLoading(false);
    await form.resetFields();
    await updateData();
  };

  return (
    <Form layout="inline" onFinish={onAddTaskFinishHandler} form={form} style={{ padding: 12 }}>
      <Flex gap="middle" style={{ width: '100%' }}>
        <Form.Item name="inputField" style={{ flex: 1 }} rules={addTodoInputRules}>
          <Input placeholder="Task be done..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isLoading} icon={<FileAddFilled />}>
            Add
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
