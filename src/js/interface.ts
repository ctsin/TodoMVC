export interface Todo {
  id?: number;
  title?: string;
  completed?: boolean;
}

export interface TodosCount {
  active: number;
  completed: number;
  total: number;
}
