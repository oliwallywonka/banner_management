<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

import { useSocket } from '@/stores/socket'

import ScreenList from './components/ScreenList.vue'
import { useGroupStore } from '@/stores/groups'

const io = useSocket()
const data = useGroupStore()

onMounted(() => {
  io.connect({ code: '-1' })
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
  <ScreenList />
</template>
