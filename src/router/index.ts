import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Dashboard from '../pages/Dashboard.vue'
import Reports from '../pages/Reports.vue'
import Settings from '../pages/Settings.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/reports', component: Reports },
  { path: '/settings', component: Settings }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
