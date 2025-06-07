import type { Todo } from '../../types/api';

import { TodoItem } from '../TodoItem/TodoItem';
import { List } from 'antd';

interface TodoListProps {
  updateData: () => void;
  todos: Todo[];
}

export const TodoList = ({ updateData, todos }: TodoListProps) => {
  return (
    <List
      dataSource={todos}
      renderItem={(todo) => {
        return (
          <List.Item>
            <TodoItem
              id={todo.id}
              text={todo.title}
              completed={todo.isDone}
              updateData={updateData}
              key={todo.id}
              
            />
          </List.Item>
        );
      }}
    />
  );
};
