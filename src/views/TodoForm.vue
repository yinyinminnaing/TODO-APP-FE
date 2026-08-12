<script setup lang="ts">
import { ref } from 'vue'

const errorMessage = ref('')
const newTask = ref('')
const newDueDate = ref('')

const emit = defineEmits(['add-todo'])

function handleSubmit() {
  if (newTask.value === '') {
    errorMessage.value = 'Task cannot be empty'
    return
  }
  emit('add-todo', {
    newTask: newTask.value,
    newDueDate: newDueDate.value,
  })
  errorMessage.value = ''
  newTask.value = ''
  newDueDate.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <input type="text" v-model="newTask" placeholder="Write to-do tasks" />
    <input type="date" v-model="newDueDate" />
    <button type="button" class="btn btn-primary" @click="handleSubmit">Add</button>
  </form>
  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
</template>

<style scoped>
.todo-form {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.todo-form input[type='text'] {
  flex: 1;
}

input,
button {
  font-family: inherit;
  font-size: 14px;
}

button:hover {
  background-color: #6366f1;
}

button {
  padding: 8px 16px;
  background-color: #5153ed;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 14px;
  margin: 0 0 16px;
}

input[type='text'],
input[type='date'] {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
}

input[type='text']:focus,
input[type='date']:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}
</style>
