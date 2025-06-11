import { API_ROUTES } from '../constants/routes';
import type { TodoStatusVariant } from '../types/api';
import { baseApiAxios } from './baseApi';

export const getAllTodos = (filter: TodoStatusVariant) =>
  baseApiAxios.get(API_ROUTES.TODOS, {
    params: { filter },
  });

//fdsfdsfdsfdsfdsfds

export const createTodo = (title: string) => baseApiAxios.post(API_ROUTES.TODOS, { title, isDone: false });

export const getTodoById = (id: number) => baseApiAxios.get(`${API_ROUTES.TODOS}/${id}`, {});

export const updateTodo = (id: number, title: string, isDone: boolean) =>
  baseApiAxios.put(`${API_ROUTES.TODOS}/${id}`, { title, isDone });

export const deleteTodo = (id: number) => baseApiAxios.delete(`${API_ROUTES.TODOS}/${id}`);
