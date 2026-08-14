export interface Todo {
  id: string
  task: string
  dueDate: string
  completed: boolean
}

export interface CreateTodoPayload {
  task: string
  dueDate: string
}

export interface UpdateTodoPayload {
  task: string
  dueDate?: string
}
