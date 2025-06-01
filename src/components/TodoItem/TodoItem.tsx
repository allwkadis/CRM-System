import type { ERROR } from '../../constants/error';

import { useState } from 'react';

import { deleteTodo, updateTodo } from '../../api/todos';

import { Button, Typography, Flex, Input, Space, Checkbox } from 'antd';

import styles from './TodoItem.module.scss';

interface TodoItemProps {
  text: string;
  completed: boolean;
  id: number;
  updateData: () => void;
}

export const TodoItem = ({ text, completed, id, updateData }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const isEditingToggle = () => setIsEditing((prev) => !prev);
  const changeEditTextValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value);

  const deleteTodoHandler = async () => {
    await deleteTodo(id);
    await updateData();
  };

  const changeIsDoneHandler = async () => {
    await updateTodo(id, editText, !completed);
    await updateData();
  };

  const cancelIsEditingHandler = () => {
    setIsEditing(false);
    setEditText(text);
  };

  const editSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateTodo(id, editText, completed);
    await updateData();
    await isEditingToggle();
  };

  //try card component

  return (
    <Flex align="start" justify="space-between" gap="middle" className={styles.todoItem}>
      <Checkbox checked={completed} onChange={changeIsDoneHandler} />
      {isEditing ? (
        <>
          <Input value={editText} onChange={changeEditTextValueHandler} autoFocus style={{ flex: 1 }} />
          <Space>
            <Button disabled={completed} size="small" variant="solid" color="green" onClick={editSubmitHandler}>
              Сохранить
            </Button>
            <Button disabled={completed} size="small" color="danger" variant="solid" onClick={cancelIsEditingHandler}>
              Отменить
            </Button>
          </Space>
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
            <Button onClick={isEditingToggle} disabled={completed} type="primary" size="small" icon={'✏️'} />
            <Button onClick={deleteTodoHandler} color="danger" variant="solid" size="small" icon={'🗑️'} />
          </Space>
        </>
      )}
    </Flex>
  );
};
