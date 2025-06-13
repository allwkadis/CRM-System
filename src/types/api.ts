export type TodoStatusVariant = 'all' | 'inWork' | 'completed';

export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T> {
  data: T[];
  info?: {
    all: number;
    completed: number;
    inWork: number;
  };
  meta: {
    totalAmount: number;
  };
}

export interface RegisterUserData {
  email: 'string';
  login: 'string';
  password: 'string';
  phoneNumber?: 'string';
  username: 'string';
}

export interface RegisterResponse {
  date: string;
  email: string;
  id: number;
  isAdmin: true;
  isBlocked: true;
  phoneNumber: string;
  username: string;
}

export interface LoginUserData {
  login: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
