import { useState } from 'react';

import { ERROR } from '../../constants/error';
import { createTodo, updateTodo } from '../../api/todos';
import { validate } from '../../utils/validate';
import styles from './TodoAddForm.module.scss';
import { Button } from '../Button/Button';

interface TodoAddFormProps {
  updateData: () => void;
}

export const TodoAddForm = ({ updateData }: TodoAddFormProps) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<ERROR | undefined>(undefined);

  const editSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateData = validate(inputValue);
    if (!validateData) {
      setError(undefined);
      await createTodo(inputValue);
      await updateData();
    }

    setInputValue('');
    setError(validateData);
  };

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <div className={styles.TodoAddForm_wrapper}>
      <form onSubmit={editSubmitHandler} className={styles.TodoAddForm}>
        <input placeholder="Task be done..." onChange={changeInputValueHandler} className={styles.CreateInput} />
        <Button variant="primary">📝 Add</Button>
      </form>
      {error && <div className={styles.Error}>{error}</div>}
    </div>
  );
};
