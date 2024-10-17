import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdvancedReserch from '../views/AdvancedReserch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/AdvancedReserch',
      name: 'AdvancedReserch',
      component: AdvancedReserch
    }
  ]
})

export default router
