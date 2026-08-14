<script lang="ts" setup>
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/stores/index'
import type { CreateTodoPayload } from '@/types/todo'
import { storeToRefs } from 'pinia'

const todoStore = useTodoStore()
const { todos, error } = storeToRefs(todoStore)

function handleAddTodo(payload: CreateTodoPayload) {
  todoStore.createTodo(payload)
}

function handleToggle(id: string) {
  todoStore.toggleTodo(id)
}

function handleDelete(id: string) {
  todoStore.deleteTodo(id)
}
</script>

<template>
  <div class="todo-app">
    <h1>To-Do Lists</h1>
    <TodoForm @add-todo="handleAddTodo" />
    <p v-if="error" class="error-banner">{{ error }}</p>
    <TodoList :todos="todos" @toggle="handleToggle" @delete="handleDelete" />
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 560px;
  margin: 48px auto;
  padding: 32px;
  background: #d8e6e6;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

h1 {
  margin: 0 0 24px;
  font-size: 24px;
  color: #276497;
}

.empty {
  color: #94a3b8;
  text-align: center;
  padding: 24px 0;
}

.loading {
  color: #276497;
  text-align: center;
  padding: 24px 0;
}

.error-banner {
  color: #b91c1c;
  background: #fee2e2;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 0 0 16px;
}
</style>
