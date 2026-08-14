import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo, CreateTodoPayload, UpdateTodoPayload } from '@/types/todo'
import * as todoService from '@/service/todoService'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const error = ref<string | null>(null)

  async function fetchTodos() {
    try {
      todos.value = await todoService.getTodos()
    } catch {
      error.value = 'Failed to fetch todos'
    }
  }

  function getById(id: string) {
    return todos.value.find((todo) => todo.id === id)
  }

  async function createTodo(payload: CreateTodoPayload) {
    try {
      const newTodo = await todoService.createTodo(payload)
      todos.value.push(newTodo)
    } catch {
      error.value = 'Failed to create todo'
    }
  }

  async function updateTodo(id: string, payload: UpdateTodoPayload) {
    try {
      const updatedTodo = await todoService.updateTodo(id, payload)
      const index = todos.value.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
      return true
    } catch {
      error.value = 'Failed to update todo'
      return false
    }
  }

  async function toggleTodo(id: string) {
    try {
      const updatedTodo = await todoService.toggleTodo(id)
      const index = todos.value.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
    } catch {
      error.value = 'Failed to toggle todo'
    }
  }

  async function deleteTodo(id: string) {
    try {
      await todoService.deleteTodo(id)
      todos.value = todos.value.filter((todo) => todo.id !== id)
    } catch {
      error.value = 'Failed to delete todo'
    }
  }

  return {
    todos,
    error,
    fetchTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    getById
  }
})
