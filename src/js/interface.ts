export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

export interface eventHandler {
  (
    target: EventTarget,
    type: string,
    handler: (event: Event) => void,
    capture?: boolean
  ): void;
}

export interface todosCount {
  active: number;
  completed: number;
  total: number;
}
