import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/requester',
      name: 'requester',
      component: () => import('../views/RequesterView.vue')
    },
    {
      path: '/validator',
      name: 'validator',
      component: () => import('../views/ValidatorView.vue')
    }
  ]
})

export default router
