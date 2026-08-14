import http from './http'
import type { CreateTodoPayload, Todo, UpdateTodoPayload } from '@/types/todo'

export async function createTodo(payload: CreateTodoPayload): Promise<Todo> {
  const response = await http.post<Todo>('/todos', payload)
  return response.data
}

export async function getTodos(): Promise<Todo[]> {
  const response = await http.get<Todo[]>('/todos')
  return response.data
}

export async function updateTodo(id: string, payload: UpdateTodoPayload): Promise<Todo> {
  const response = await http.patch<Todo>(`/todos/${id}`, payload)
  return response.data
}

export async function deleteTodo(id: string): Promise<void> {
  await http.delete(`/todos/${id}`)
}

export async function toggleTodo(id: string): Promise<Todo> {
  const response = await http.patch<Todo>(`/todos/${id}/completed`)
  return response.data
}
