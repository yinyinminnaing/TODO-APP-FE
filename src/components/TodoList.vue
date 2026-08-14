<script setup lang="ts">
import type { Todo } from '@/types/todo'
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores'

defineProps<{
  todos: Todo[]
}>()

const todoStore = useTodoStore()

const emit = defineEmits<{
  toggle: [id: string]
  delete: [id: string]
}>()

function handleToggle(id: string) {
  emit('toggle', id)
}

function deleteTask(id: string) {
  emit('delete', id)
}

onMounted(async () => {
  await todoStore.fetchTodos()
})
</script>

<template>
  <ul>
    <li class="todo-item" v-for="todo in todos" :key="todo.id">
      <input
        type="checkbox"
        class="todo-checkbox"
        @change="handleToggle(todo.id)"
        :checked="todo.completed"
      />
      <span class="todo-task" :class="{ done: todo.completed }">{{ todo.task }}</span>
      <span class="todo-date">{{ todo.dueDate }}</span>
      <RouterLink :to="{ name: 'todoEdit', params: { id: todo.id } }" class="btn btn-edit">
        Edit
      </RouterLink>
      <button class="btn btn-delete" @click="deleteTask(todo.id)">Delete</button>
    </li>
  </ul>
</template>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #eef2f7;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
  cursor: pointer;
}

.todo-task {
  flex: 1;
  color: #1e293b;
}

.todo-date {
  font-size: 13px;
  color: #1e293b;
}

.done {
  text-decoration: line-through;
  opacity: 0.6;
}

.edit-task {
  flex: 1;
}

.edit-input {
  font-family: inherit;
  font-size: 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 8px 12px;
}

.edit-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn:hover {
  opacity: 0.85;
}
.btn-edit {
  background: #e0e7ff;
  color: #4338ca;
}

.btn-delete {
  background: #fee2e2;
  color: #b91c1c;
}

.btn-save {
  background: #dcfce7;
  color: #15803d;
}

.btn-cancel {
  background: #f1f5f9;
  color: #475569;
}
</style>
