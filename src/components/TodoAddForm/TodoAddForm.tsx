import { useState } from 'react';

import { ERROR } from '../../constants/error';
import { createTodo } from '../../api/todos';
import { validate } from '../../utils/validate';
import { Button } from '../Button/Button';
import { Flex, Form, Input } from 'antd';

import styles from './TodoAddForm.module.scss';

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
      await setInputValue('');
      await updateData();
    }

    setInputValue('');
    setError(validateData);
  };

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <div className={styles.TodoAddForm_wrapper}>
      <Form onSubmitCapture={editSubmitHandler}>
        <Flex gap="small">
          <Input placeholder="Task be done..." value={inputValue} onChange={changeInputValueHandler} />
          <Button variant="primary" type="submit">
            📝 Add
          </Button>
        </Flex>
      </Form>
      {error && <div className={styles.Error}>{error}</div>}
    </div>
  );
};
