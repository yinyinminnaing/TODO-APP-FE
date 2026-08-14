<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/index'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const todoStore = useTodoStore()

const editTask = ref('')
const editDueDate = ref('')
const formError = ref('')
const notFound = ref(false)

onMounted(async () => {
  if (todoStore.todos.length === 0) {
    await todoStore.fetchTodos()
  }

  const todo = todoStore.getById(props.id)

  if (!todo) {
    notFound.value = true
    return
  }
  editTask.value = todo.task
  editDueDate.value = todo.dueDate
})

async function handleSave() {
  if (editTask.value === '') {
    formError.value = 'Task cannot be empty'
    return
  }
  const success = await todoStore.updateTodo(props.id, {
    task: editTask.value,
    dueDate: editDueDate.value,
  })
  if (success) {
    router.push({ name: 'todos' })
  }
}

function handelCancel() {
  router.push({ name: 'todos' })
}
</script>
<template>
  <div class="todo-edit">
    <h1>Edit Task</h1>
    <p v-if="notFound" class="empty">Task not found</p>
    <form v-else class="edit-form" @submit.prevent="handleSave">
      <input type="text" v-model="editTask" class="edit-input edit-task" />
      <input type="date" v-model="editDueDate" class="edit-input" />
      <p v-if="formError" class="error">{{ formError }}</p>
      <p v-if="todoStore.error" class="error">{{ todoStore.error }}</p>
      <div class="actions">
        <button class="btn btn-save" type="submit">Save</button>
        <button class="btn btn-cancel" @click="handelCancel" type="button">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.todo-edit {
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

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  font-family: inherit;
  font-size: 14px;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn:hover {
  opacity: 0.85;
}

.btn-save {
  background: #dcfce7;
  color: #15803d;
}

.btn-cancel {
  background: #f1f5f9;
  color: #475569;
}

.error {
  color: red;
  font-size: 14px;
  margin: 0;
}

.empty {
  color: #94a3b8;
  text-align: center;
  padding: 24px 0;
}
</style>
