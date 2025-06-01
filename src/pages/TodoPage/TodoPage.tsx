import type { MetaResponse, Todo, TodoInfo, TodoStatusVariant } from '../../types/api';

import { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';

import { getAllTodos } from '../../api/todos';
import { TodoAddForm } from '../../components/TodoAddForm/TodoAddForm';
import { TodoStatusInfo } from '../../components/TodoStatusInfo/TodoStatusInfo';
import { TodoList } from '../../components/TodoList/TodoList';

export const TodoPage = () => {
  const [activeStatus, setActiveStatus] = useState<TodoStatusVariant>('all');
  const [data, setData] = useState<MetaResponse<Todo>>();

  const updateData = async (status: TodoStatusVariant) => {
    const data = await getAllTodos(status);
    await setData(data);
  };

  const changeStatusHandler = (status: TodoStatusVariant) => setActiveStatus(status);

  useEffect(() => {
    updateData(activeStatus);
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
