import { useState } from 'react';

import { Button, Typography, Flex, Input, Space, Checkbox, Form, message } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';

import { ERROR } from '../../constants/error';
import { deleteTodo, updateTodo } from '../../api/todos';

import styles from './TodoItem.module.scss';

interface TodoItemProps {
  text: string;
  completed: boolean;
  id: number;
  updateData: () => void;
}

const EditTextRules = [
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

export const TodoItem = ({ text, completed, id, updateData }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();

  const onStartEditing = () => setIsEditing(true);
  const onStopEditing = () => setIsEditing(false);

  const onSuccessEditMessage = () => {
    messageApi.success({
      content: 'Задача успешно изменена',
      style: {
        position: 'absolute',
        right: 10,
      },
    });
  };

  const onErrorAddTodoMessage = () => {
    messageApi.error({
      content: 'Ошибка при измении задачи',
      style: {
        position: 'absolute',
        right: 10,
      },
    });
  };

  const changeIsDoneHandler = async () => {
    await updateTodo(id, text, !completed);
    updateData();
  };

  const cancelIsEditingHandler = () => {
    form.setFieldValue('editInput', text);
    onStopEditing();
  };

  const deleteTodoHandler = async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      updateData();
    }
  };

  const editSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const editInputValue = form.getFieldValue('editInput');
      await updateTodo(id, editInputValue, completed);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      onSuccessEditMessage();
      setIsLoading(false);
      updateData();
    }
  };

  return (
    <Flex align="start" gap="middle" className={styles.todoItem}>
      {contextHolder}
      <Checkbox checked={completed} onChange={changeIsDoneHandler} disabled={isEditing} />
      {isEditing ? (
        <>
          <Form
            layout="inline"
            name="editForm"
            form={form}
            onFinish={editSubmitHandler}
            onFinishFailed={onErrorAddTodoMessage}
            style={{ width: '100%' }}
          >
            <Flex gap={'middle'} style={{ width: '100%' }}>
              <Form.Item style={{ flex: 1 }} name="editInput" rules={EditTextRules}>
                <Input autoFocus defaultValue={text} />
              </Form.Item>
              <Space size={'middle'}>
                <Form.Item name="editSaveButton">
                  <Button
                    disabled={completed}
                    size="small"
                    variant="solid"
                    color="green"
                    htmlType="submit"
                    loading={isLoading}
                  >
                    Сохранить
                  </Button>
                </Form.Item>
                <Form.Item name="editCancelButton">
                  <Button
                    disabled={completed}
                    size="small"
                    color="danger"
                    variant="solid"
                    onClick={cancelIsEditingHandler}
                  >
                    Отменить
                  </Button>
                </Form.Item>
              </Space>
            </Flex>
          </Form>
        </>
      ) : (
        <>
          <Typography.Text
            delete={completed}
            style={{
              flex: 1,
            }}
          >
            {text}
          </Typography.Text>
          <Space>
            <Button onClick={onStartEditing} disabled={completed} type="primary" size="small" icon={<EditFilled />} />
            <Button onClick={deleteTodoHandler} color="danger" variant="solid" size="small" icon={<DeleteFilled />} />
          </Space>
        </>
      )}
    </Flex>
  );
};
