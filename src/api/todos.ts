import type { MetaResponse, Todo } from '../types/api';
import type { TodoStatusVariant } from '../types/api';

import { baseApi } from './baseApi';
import { API_ROUTES } from '../constants/routes';

export const getAllTodos = (filter: TodoStatusVariant) =>
  baseApi<MetaResponse<Todo>>(`${API_ROUTES.TODOS}?filter=${filter}`);

export const getTodoById = (id: number) => baseApi<Todo>(`${API_ROUTES.TODOS}/${id}`);

export const createTodo = (title: string) =>
  baseApi<Todo>(API_ROUTES.TODOS, {
    method: 'POST',
    body: JSON.stringify({ title, isDone: false }),
  });

export const updateTodo = (id: number, title: string, isDone: boolean) =>
  baseApi<Todo>(`${API_ROUTES.TODOS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title: title, isDone: isDone }),
  });

export const deleteTodo = (id: number) =>
  baseApi<string>(`${API_ROUTES.TODOS}/${id}`, {
    method: 'DELETE',
  });
