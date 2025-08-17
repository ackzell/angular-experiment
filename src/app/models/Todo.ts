export type TodoId = ReturnType<typeof crypto.randomUUID>;

export interface Todo {
  id: TodoId;
  title: string;
  completed: boolean;
}
