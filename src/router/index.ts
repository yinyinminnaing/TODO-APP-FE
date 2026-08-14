import EditTodoView from '@/views/EditTodoView.vue'
import TodoListView from '@/views/TodoListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: TodoListView,
    },
    {
      path: '/todos/:id',
      name: 'todoEdit',
      component: EditTodoView,
      props: true,
    },
  ],
})

export default router
