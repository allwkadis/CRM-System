import { useState } from 'react';
import styles from './TodoItem.module.scss';
import type { ERROR } from '../../constants/error';
import { deleteTodo, updateTodo } from '../../api/todos';
import { validate } from '../../utils/validate';
import { Button, Checkbox, Input, Form, Space, Typography, Flex } from 'antd';

interface TodoItemProps {
  text: string;
  completed: boolean;
  id: number;
  updateData: () => void;
}

const { Text } = Typography;

export const TodoItem = ({ text, completed, id, updateData }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [error, setError] = useState<ERROR | undefined>(undefined);

  const isEditingToggle = () => setIsEditing((prev) => !prev);

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

    const validateData = validate(editText);

    if (!validateData) {
      await updateTodo(id, editText, completed);
      await updateData();
      await isEditingToggle();
    }

    setError(validateData);
  };

  return (
    <div className={`${styles.todoItem}`}>
      <div className={styles.todoContent}>
        <input
          type="checkbox"
          checked={completed}
          onChange={changeIsDoneHandler}
          className={styles.todoCheckbox}
          disabled={isEditing}
        />
        {isEditing ? (
          <form onSubmit={editSubmitHandler} className={styles.editForm}>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className={styles.editInput}
              autoFocus
            />
            <div className={styles.Error}>{error}</div>
          </form>
        ) : (
          <Text delete={completed}>{text}</Text>
        )}
      </div>
      <Flex gap="small">
        {isEditing ? (
          <Flex gap="small">
            <Button disabled={completed} size="small" variant="solid" color="green" onClick={editSubmitHandler}>
              Сохранить
            </Button>
            <Button disabled={completed} size="small" color="danger" variant="solid" onClick={cancelIsEditingHandler}>
              Отменить
            </Button>
          </Flex>
        ) : (
          <Flex gap="small">
            <Button onClick={isEditingToggle} disabled={completed} type="primary" size="small" icon={'✏️'} />
            <Button onClick={deleteTodoHandler} color="danger" variant="solid" size="small" icon={'🗑️'} />
          </Flex>
        )}
      </Flex>
    </div>
  );
  // <Flex justify="space-betwen" className={styles.todoItem}>
  //   <Flex className={styles.todoContent}>
  //     {isEditing ? (
  //       <Space>
  //         <Space>
  //           <Checkbox className={styles.todoCheckbox} />
  //           <Form>
  //             <Input autoFocus />
  //           </Form>
  //         </Space>
  //         <Space>
  //           <Button disabled={completed} size="small" variant="solid" color="green" onClick={editSubmitHandler}>
  //             Сохранить
  //           </Button>
  //           <Button disabled={completed} size="small" color="danger" variant="solid" onClick={cancelIsEditingHandler}>
  //             Отменить
  //           </Button>
  //         </Space>
  //       </Space>
  //     ) : (
  //       <Flex justify="space-between">
  //         <Flex gap="small" align="top">
  //           <Checkbox />
  //           <Text>{text}</Text>
  //         </Flex>
  //         <Flex>
  //           <Button onClick={isEditingToggle} disabled={completed} variant="solid" type="primary" size="small">
  //             ✏️
  //           </Button>
  //           <Button onClick={deleteTodoHandler} color="danger" variant="solid" size="small">
  //             🗑️
  //           </Button>
  //         </Flex>
  //       </Flex>
  //     )}
  //   </Flex>
  // </Flex>
};
