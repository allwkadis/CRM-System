import type { TodoStatusVariant, MetaResponse, Todo } from './types/api';

import { useEffect, useState } from 'react';

import { getAllTodos } from './api/todos';
import { TodoAddForm } from './components/TodoAddForm/TodoAddForm';
import { TodoStatusInfo } from './components/TodoStatusInfo/TodoStatusInfo';

function App() {
  const [activeStatus, setActiveStatus] = useState<TodoStatusVariant>('all');
  const [data, setData] = useState<MetaResponse<Todo>>();

  const updateData = async (status: TodoStatusVariant) => {
    const data = await getAllTodos(status);
    await setData(data);
  };

  useEffect(() => {
    updateData(activeStatus);
  }, [activeStatus]);

  if (!data) return <div>loading...</div>;

  return (
    <div className="wrapper">
      <div className="todo_wrapper">
        <TodoAddForm updateData={() => updateData(activeStatus)} />
        <TodoStatusInfo todosInfo={data?.info} updateData={updateData} activeStatus={activeStatus}/>
        {/* <TodoList /> */}
      </div>
    </div>
  );
}

export default App;
