import { useState } from 'react';

import { Button, Typography, Flex, Input, Space, Checkbox, Form, message } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';

import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from '../../constants/todo';
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
    min: TODO_TITLE_MIN_LENGTH,
    message: `Текст задачи не может быть меньше ${TODO_TITLE_MIN_LENGTH}`,
  },
  {
    max: TODO_TITLE_MAX_LENGTH,
    message: `Текст задачи не может быть меньше ${TODO_TITLE_MAX_LENGTH}`,
  },
];

export const TodoItem = ({ text, completed, id, updateData }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();

  const startEditingHandler = () => setIsEditing(true);

  const closeEditingHandler = () => setIsEditing(false);

  const cancelIsEditingHandler = () => {
    form.setFieldValue('editInput', text);
    closeEditingHandler();
  };

  // вынести toasts на вверх

  const onErrorMessage = () => {
    messageApi.success({
      content: 'Произошла ошибка',
      style: {
        position: 'absolute',
        right: 10,
      },
    });
  };

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
    try {
    } catch (err) {
      onErrorMessage();
    } finally {
      updateData();
    }
  };

  const deleteTodoHandler = async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
    } catch (err) {
      onErrorMessage();
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
      onSuccessEditMessage();
      setIsEditing(false);
    } catch (error) {
      onErrorMessage();
    } finally {
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
            <Button onClick={startEditingHandler} disabled={completed} type="primary" size="small" icon={<EditFilled />} />
            <Button onClick={deleteTodoHandler} color="danger" variant="solid" size="small" icon={<DeleteFilled />} />
          </Space>
        </>
      )}
    </Flex>
  );
};
