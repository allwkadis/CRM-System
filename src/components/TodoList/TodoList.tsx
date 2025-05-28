import styles from './TodoList.module.scss';
import { TodoItem } from '../TodoItem/TodoItem';
import type { Todo } from '../../types/api';

interface TodoListProps {
  updateData: () => void;
  todos: Todo[];
}

export const TodoList = ({ updateData, todos }: TodoListProps) => {
  return (
    <ul className={styles.TodoList}>
      {todos?.map((todo) => (
        <TodoItem id={todo.id} text={todo.title} completed={todo.isDone} updateData={updateData} key={todo.id} />
      ))}
    </ul>
  );
};
