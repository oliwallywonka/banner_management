import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: '/screens',
          name: 'screens',
          component: () => import('@/views/screens/ScreensView.vue'),
        },
        {
          path: '/screens/:screenId',
          name: 'screen',
          component: () => import('@/views/screens/views/PreviewView.vue'),
        },
        {
          path: '/content',
          name: 'content',
          component: () => import('@/views/ContentView.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
        },
      ],
    },
  ],
})

export default router
