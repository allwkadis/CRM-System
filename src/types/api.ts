export type filterVariant = 'all' | 'inWork' | 'done';

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
