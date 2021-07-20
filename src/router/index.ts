import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import FindMatchingTenants from '../views/FindMatchingTenants.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Find Matching Tenants',
    component: FindMatchingTenants,
    meta: {
      title: 'Find Matching Tenants'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // @ts-ignore
  document.title = to.meta.title + " | Roomwise"
  next()
})

export default router
