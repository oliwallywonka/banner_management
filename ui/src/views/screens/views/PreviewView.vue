<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useSocket } from '@/stores/socket'
import { useScreenPreviewStore } from '@/stores/screenPreview'

const route = useRoute()
const io = useSocket()
const store = useScreenPreviewStore()

const credentials = computed(() => ({
  code: route.params.code as string,
}))

onMounted(() => {
  console.log('disconnecting socket')
  io.connect(credentials.value)
})

watch(
  () => io.isConnected,
  (isConnected) => {
    if (!isConnected) return
    store.listenEvents()
    store.setScreenStatus('active')
    //store.getScreen(Number(route.params.screenId))
  },
)

watch(
  () => store.screenPreview,
  (screenPreview) => {
    if (!screenPreview) return
    store.getCurrentGroup()
  },
)

onUnmounted(() => {
  if (!io.socket) return
  io.disconnect()
})
</script>

<template>
  <h1>{{}}</h1>
  {{ io.isConnected }}
  {{ JSON.stringify(io.credentials) }}
  {{ JSON.stringify(store.screenPreview) }}
  {{ JSON.stringify(store.currentGroup) }}
</template>
