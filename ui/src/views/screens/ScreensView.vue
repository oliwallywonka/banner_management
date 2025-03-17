<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

import { useSocket } from '@/stores/socket'
import { useScreenStore } from '@/stores/screens'

import ContentScreenList from './components/ContentScreenList.vue'
import ScreenList from './components/ScreenList.vue'

const io = useSocket()
const data = useScreenStore()

onMounted(() => {
  io.connect({ screenId: -1, rol: 'admin' })
})

watch(
  () => io.isConnected,
  (isConnected) => {
    if (isConnected) {
      data.listenEvents()
    }
  },
)

onUnmounted(() => {
  if (!io.socket) return
  io.disconnect()
})
</script>

<template>
  {{ JSON.stringify(io.credentials) }}
  <div class="grid md:grid-cols-2 gap-4 p-4">
    <ScreenList />
    <ContentScreenList />
  </div>
</template>
