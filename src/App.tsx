import type { TodoStatusVariant, MetaResponse, Todo } from './types/api';

import { useEffect, useState } from 'react';

import { getAllTodos } from './api/todos';
import { TodoAddForm } from './components/TodoAddForm/TodoAddForm';

function App() {
  const [activeFilter, setActiveFilters] = useState<TodoStatusVariant>('all');
  const [data, setData] = useState<MetaResponse<Todo>>();

  const updateData = async (status: TodoStatusVariant) => {
    const data = await getAllTodos(status);
    await setData(data);
  };

  useEffect(() => {
    updateData(activeFilter);
  }, [activeFilter]);

  // const { data: todos, info: todoInfo } = data;

  return (
    <div className="wrapper">
      <div className="todo_wrapper">
        <TodoAddForm updateData={() => updateData(activeFilter)} />
        {/* <TodoStatusView /> */}
        {/* <TodoList /> */}
      </div>
    </div>
  );
}

export default App;
