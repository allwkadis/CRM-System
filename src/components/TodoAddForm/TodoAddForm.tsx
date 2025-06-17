import { useState } from 'react';

import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from '../../constants/todo';
import { createTodo } from '../../api/todos';

import { Flex, Form, Input, Button, App } from 'antd';
import { FileAddFilled } from '@ant-design/icons';

interface TodoAddFormProps {
  updateData: () => void;
}

//trest321


const addTodoInputRules = [
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

export const TodoAddForm = ({ updateData }: TodoAddFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { notification } = App.useApp();

  const onSuccessAddTodo = () => {
    notification.success({
      message: 'Успешно',
      description: 'Задача успешно добавлена',
    });
  };

  const onErrorAddTodoMessage = () => {
    notification.error({
      message: 'Ошибка',
      description: 'При добавлении задачи произошла ошибка',
    });
  };

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
