import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdvancedResearch from '../views/AdvancedResearch.vue'
import VillainDetail from '@/views/VillainDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/advanced-research/',
      name: 'AdvancedResearch',
      component: AdvancedResearch,
    },
    {
      path: '/villain-details/:slug',
      name: 'VillainDetail',
      component: VillainDetail
    }
  ],
})

export default router
