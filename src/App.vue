<script setup lang="ts">
import { ref } from 'vue'
import TodoForm from './views/TodoForm.vue'
import TodoList from './views/TodoList.vue'

const todos = ref([])

function addTodo(newTaskData) {
  todos.value.push({
    id: crypto.randomUUID(),
    task: newTaskData.newTask,
    duedate: newTaskData.newDueDate,
    completed: false,
  })
  newTaskData = ''
}

function deleteTodo(id) {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

function saveEdit(id, editTask, editDueDate) {
  if (editTask === '') {
    return
  }

  const existingTodo = todos.value.find((todo) => todo.id == id)
  if (existingTodo) {
    existingTodo.task = editTask
    existingTodo.duedate = editDueDate
  }
}

function cancelEdit() {
  editingId.value = null
}

function handleToggle(id) {
  const todo = todos.value.find((todo) => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
</script>

<template>
  <div class="todo-app">
    <h1>To-Do Lists</h1>
    <TodoForm @add-todo="addTodo" />
    <TodoList :todos="todos" @toggle="handleToggle" @save="saveEdit" @delete="deleteTodo" />

    <p v-if="todos.length === 0" class="empty">No tasks</p>
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
</style>
