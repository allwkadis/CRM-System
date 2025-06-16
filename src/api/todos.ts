import type { Todo, TodoStatusVariant } from '../types/api';

import { baseApiAxios } from './baseApi';
import { API_ROUTES } from '../utils/constants/routes';

export const getAllTodos = (filter: TodoStatusVariant) => {
  try {
    const response = baseApiAxios.get(API_ROUTES.TODOS, {
      params: { filter },
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const createTodo = async (title: string) => {
  try {
    const response = await baseApiAxios.post<Todo>(API_ROUTES.TODOS, { title, isDone: false });
    return response;
  } catch (err) {
    throw err;
  }
};

export const getTodoById = (id: number) => {
  try {
    const response = baseApiAxios.get<Todo>(`${API_ROUTES.TODOS}/${id}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateTodo = (id: number, title: string, isDone: boolean) => {
  try {
    const response = baseApiAxios.put<Todo>(`${API_ROUTES.TODOS}/${id}`, { title, isDone });
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteTodo = (id: number) => {
  try {
    const response = baseApiAxios.delete(`${API_ROUTES.TODOS}/${id}`);
    return response;
  } catch (err) {
    throw err;
  }
};
