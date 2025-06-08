import type { MetaResponse, Todo, TodoInfo, TodoStatusVariant } from '../../types/api';

import { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';

import { getAllTodos } from '../../api/todos';
import { TodoAddForm } from '../../components/TodoAddForm/TodoAddForm';
import { TodoStatusInfo } from '../../components/TodoStatusInfo/TodoStatusInfo';
import { TodoList } from '../../components/TodoList/TodoList';
import { TODO_REFRESH_DELAY } from '../../constants/todo';

export const TodoPage = () => {
  const [activeStatus, setActiveStatus] = useState<TodoStatusVariant>('all');
  const [data, setData] = useState<MetaResponse<Todo>>();

  const updateData = async (status: TodoStatusVariant) => {
    const data = await getAllTodos(status);
    setData(data.data);
  };

  const changeStatusHandler = (status: TodoStatusVariant) => setActiveStatus(status);

  useEffect(() => {
    let refreshTodosInterval = setInterval(() => updateData(activeStatus), TODO_REFRESH_DELAY);
    updateData(activeStatus);

    return () => clearInterval(refreshTodosInterval);
  }, [activeStatus]);

  if (!data)
    return (
      <Flex align="center" justify="center">
        <div className="todo_wrapper">
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <Spin />
          </Flex>
        </div>
      </Flex>
    );

  return (
    <Flex align="center" justify="center" style={{ height: '100%' }}>
      <div className="todo_wrapper">
        <Flex vertical>
          <TodoAddForm updateData={() => updateData(activeStatus)} />
          <TodoStatusInfo changeStatusHandler={changeStatusHandler} taskCount={data.info as TodoInfo} />
          <TodoList updateData={() => updateData(activeStatus)} todos={data.data} />
        </Flex>
      </div>
    </Flex>
  );
};
