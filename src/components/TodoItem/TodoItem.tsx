import { memo, useState } from 'react';

import { Button, Typography, Flex, Input, Space, Checkbox, Form, App } from 'antd';
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
  {
    min: TODO_TITLE_MIN_LENGTH,
    message: `Текст задачи не может быть меньше ${TODO_TITLE_MIN_LENGTH}`,
  },
  {
    max: TODO_TITLE_MAX_LENGTH,
    message: `Текст задачи не может быть меньше ${TODO_TITLE_MAX_LENGTH}`,
  },
];

export const TodoItem = memo(({ text, completed, id, updateData }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = useForm();

  const { notification } = App.useApp();

  const startEditingHandler = () => setIsEditing(true);

  const closeEditingHandler = () => setIsEditing(false);

  const cancelIsEditingHandler = () => {
    form.setFieldValue('editInput', text);
    closeEditingHandler();
  };

  const onErrorMessage = () => {
    notification.error({
      message: 'Ошибка',
      description: 'Произошла ошибка',
    });
  };

  const onErrorAddTodoMessage = () => {
    notification.error({
      message: 'Ошибка',
      description: 'Произошла ошибка при редактировании задачи',
    });
  };

  const onSuccessEditMessage = () => {
    notification.success({
      message: 'Успешно',
      description: 'Задача успешно изменена',
    });
  };

  const onSuccessDeleteTodo = () => {
    notification.success({
      message: 'Успешно',
      description: 'Задача успешно удалена',
    });
  };

  const cancelIsEditingHandler = () => {
    setIsEditing(false);
    setEditText(text);
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
      onSuccessDeleteTodo();
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
    <div className={`${styles.todoItem} ${completed ? styles.completed : ''}`}>
      <div className={styles.todoContent}>
        <input
          type="checkbox"
          checked={completed}
          onChange={changeIsDoneHandler}
          className={styles.todoCheckbox}
          aria-label="Toggle task"
          disabled={isEditing}
        />

        {isEditing ? (
          <form onSubmit={editSubmitHandler} className={styles.editForm}>
            <label>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className={styles.editInput}
                autoFocus
              />
              <div className={styles.Error}>{error}</div>
            </label>
          </form>
        ) : (
          <span className={styles.todoText}>{text}</span>
        )}
      </div>

      <div className={styles.todoActions}>
        {isEditing ? (
          <>
            <button
              className={`${styles.actionButton} ${styles.editButton}`}
              disabled={completed}
              onClick={editSubmitHandler}
            >
              Сохранить
            </button>
            <button
              onClick={() => console.log(1)}
              className={`${styles.actionButton} ${styles.editButton}`}
              disabled={completed}
            >
              Отменить
            </button>
          </>
        ) : (
          <button
            onClick={isEditingToggle}
            className={`${styles.actionButton} ${styles.editButton}`}
            aria-label="Edit task"
            disabled={completed}
          >
            {text}
          </Typography.Text>
          <Space>
            <Button
              onClick={startEditingHandler}
              disabled={completed}
              type="primary"
              size="small"
              icon={<EditFilled />}
            />
            <Button onClick={deleteTodoHandler} color="danger" variant="solid" size="small" icon={<DeleteFilled />} />
          </Space>
        </>
      )}
    </Flex>
  );
});
