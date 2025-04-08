import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: '/screens',
          name: 'screens',
          component: () => import('@/views/screens/ScreensView.vue'),
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
    {
      path: '/screens/:code',
      name: 'screen',
      component: () => import('@/views/screens/views/PreviewView.vue'),
    },
  ],
})

export default router
