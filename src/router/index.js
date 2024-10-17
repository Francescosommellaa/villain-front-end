import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdvancedResearch from '../views/AdvancedResearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/AdvancedResearch',
      name: 'AdvancedResearch',
      component: AdvancedResearch
    }
  ]
})

export default router
