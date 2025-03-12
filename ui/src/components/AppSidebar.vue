<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import NavMenu from './NavMenu.vue'
import NavUser from './NavUser.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import { PictureInPicture, PieChart, ScreenShareIcon } from 'lucide-vue-next'
import DarkToogle from './ui/darktoogle/DarkToogle.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data.
const data = {
  user: {
    name: 'Homero Tompson',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  menu: [
    {
      name: 'Dashboard',
      url: '/',
      icon: PieChart,
    },
    {
      name: 'Pantallas',
      url: '/screens',
      icon: ScreenShareIcon,
    },
    {
      name: 'Contenido',
      url: '/content',
      icon: PictureInPicture,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <NavUser :user="data.user" />
      <DarkToogle />
    </SidebarHeader>
    <SidebarContent>
      <NavMenu :menu="data.menu" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
