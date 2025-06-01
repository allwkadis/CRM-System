import { useState } from 'react';

import { ERROR } from '../../constants/error';
import { createTodo } from '../../api/todos';

import { Flex, Form, Input, Button } from 'antd';

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
  const [inputValue, setInputValue] = useState('');

  const [form] = Form.useForm();

  const editSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.validateFields();
    await createTodo(inputValue);
    await form.resetFields();
    await updateData();
  };

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <Form layout="inline" onSubmitCapture={editSubmitHandler} form={form} style={{ padding: 12 }}>
      <Flex gap="middle" style={{ width: '100%' }}>
        <Form.Item name="inputField" style={{ flex: 1 }} rules={addTodoInputRules}>
          <Input placeholder="Task be done..." value={inputValue} onChange={changeInputValueHandler} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            📝 Add
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
