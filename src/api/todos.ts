import type { MetaResponse, Todo, TodoRequest } from '../types/api';
import type { filterVariant } from '../types/api';

import { baseApi } from './baseApi';
import { ROUTES } from '../constants/routes';

export const getAllTodos = (filter: filterVariant) => baseApi<MetaResponse<Todo>>(`${ROUTES.TODOS}?filter=${filter}`);

export const getTodoById = (id: number) => baseApi<Todo>(`${ROUTES.TODOS}/${id}`);

export const createTodo = (userData: TodoRequest) =>
  baseApi<Todo>(ROUTES.TODOS, {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const updateTodo = (id: number, title: string, isDone: boolean) =>
  baseApi<Todo>(`${ROUTES.TODOS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title: title, isDone: isDone }),
  });

export const deleteTodo = (id: number) =>
  baseApi<string>(`${ROUTES.TODOS}/${id}`, {
    method: 'DELETE',
  });
