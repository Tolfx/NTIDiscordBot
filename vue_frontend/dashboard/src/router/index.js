import { createRouter, createWebHistory, } from 'vue-router'
import Home from '../views/Home.vue'

//All routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
