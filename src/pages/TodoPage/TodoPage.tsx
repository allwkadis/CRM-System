import type { MetaResponse, Todo, TodoInfo, TodoStatusVariant } from '../../types/api';

import { useCallback, useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';

import { getAllTodos } from '../../api/todos';
import { TodoAddForm } from '../../components/TodoAddForm/TodoAddForm';
import { TodoStatusInfo } from '../../components/TodoStatusInfo/TodoStatusInfo';
import { TodoList } from '../../components/TodoList/TodoList';
import { TODO_REFRESH_DELAY } from '../../utils/constants/todo';

export const TodoPage = () => {
  const [activeStatus, setActiveStatus] = useState<TodoStatusVariant>('all');
  const [data, setData] = useState<MetaResponse<Todo> | null>(null);

  const updateData = useCallback(async (status: TodoStatusVariant) => {
    const response = await getAllTodos(status);
    const data = response.data;
    setData(data);
  }, []);

  const changeStatusHandler = useCallback((status: TodoStatusVariant) => setActiveStatus(status), []);

  useEffect(() => {
    let refreshTodosInterval = setInterval(() => updateData(activeStatus), TODO_REFRESH_DELAY);
    updateData(activeStatus);

    return () => clearInterval(refreshTodosInterval);
  }, [activeStatus]);

  {
    return data ? (
      <Flex align="center" justify="center" style={{ height: '100%' }}>
        <div className="todo_wrapper">
          <Flex vertical>
            <TodoAddForm updateData={() => updateData(activeStatus)} />
            <TodoStatusInfo changeStatusHandler={changeStatusHandler} taskCount={data.info as TodoInfo} />
            <TodoList updateData={() => updateData(activeStatus)} todos={data.data} />
          </Flex>
        </div>
      </Flex>
    ) : (
      <>
        <Flex align="center" justify="center">
          <div className="todo_wrapper">
            <Flex align="center" justify="center" style={{ height: '100%' }}>
              <Spin />
            </Flex>
          </div>
        </Flex>
      </>
    );
  }
};
