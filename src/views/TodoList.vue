<script setup lang="ts">
import { idText } from 'typescript'
import { ref } from 'vue'

const editingId = ref('')
const editTask = ref('')
const editDueDate = ref('')

interface Todo {
  id: string
  task: string
  duedate: string
  completed: boolean
}

const props = defineProps<{
  todos: Todo[]
}>()

function startEdit(todo: Todo) {
  editingId.value = todo.id
  editTask.value = todo.task
  editDueDate.value = todo.duedate
}

const emit = defineEmits<{
  toggle: [id: string]
  delete: [id: string]
  save: [id: string, task: string, duedate: string]
}>()

function handleToggle(id: string) {
  emit('toggle', id)
}

function saveEdit(id: string) {
  emit('save', id, editTask.value, editDueDate.value)
  editingId.value = ''
  editTask.value = ''
  editDueDate.value = ''
}

function cancelEdit() {
  editingId.value = ''
}

function deleteTask(id: string) {
  emit('delete', id)
}
</script>

<template>
  <ul>
    <li class="todo-item" v-for="todo in todos" :key="todo.id">
      <template v-if="editingId !== todo.id">
        <input
          type="checkbox"
          class="todo-checkbox"
          @change="handleToggle(todo.id)"
          :checked="todo.completed"
        />
        <span class="todo-task" :class="{ done: todo.completed }">{{ todo.task }}</span>
        <span class="todo-date">{{ todo.duedate }}</span>
        <button class="btn btn-edit" @click="startEdit(todo)">Edit</button>
        <button class="btn btn-delete" @click="deleteTask(todo.id)">Delete</button>
      </template>
      <template v-else>
        <input type="text" v-model="editTask" class="edit-input edit-task" />
        <input type="date" v-model="editDueDate" class="edit-input" />
        <button class="btn btn-save" @click="saveEdit(todo.id)">Save</button>
        <button class="btn btn-cancel" @click="cancelEdit">Cancel</button>
      </template>
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
