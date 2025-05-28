import { useState } from 'react';
import styles from './TodoItem.module.scss';
import type { ERROR } from '../../constants/error';
import { deleteTodo, updateTodo } from '../../api/todos';
import { validate } from '../../utils/validate';

interface TodoItemProps {
  text: string;
  completed: boolean;
  id: number;
  updateData: () => void;
}

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
            ✏️
          </button>
        )}
        <div className={styles.todoActions}>
          <button
            onClick={deleteTodoHandler}
            className={`${styles.actionButton} ${styles.deleteButton}`}
            aria-label="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};
