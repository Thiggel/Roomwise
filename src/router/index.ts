import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import FindMatchingTenants from '../views/FindMatchingTenants.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Find Matching Tenants',
    component: FindMatchingTenants
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
