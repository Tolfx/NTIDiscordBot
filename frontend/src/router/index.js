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
    path: "/dashboard/config",
    name: "Config",
    component: () => import("../views/Config.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/config/new",
    name: "ConfigNew",
    component: () => import("../views/ConfigNew.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/secure',
    name: 'Secure',
    component: () => import('../views/Secure.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/oauth2',
    name: 'oAuth2',
    component: () => import('../views/oAuth2.vue'),
    meta: { requiresAuth: false }
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
