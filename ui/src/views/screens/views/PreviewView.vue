<script setup lang="ts">
import { io } from 'socket.io-client'
import { ref } from 'vue'

const socket = io('ws://localhost:3001')

const screenId = ref<number | undefined>()

socket.on('connect', () => {
  console.log('connected')
})

socket.on('add-content-to-screen', (data) => {
  screenId.value = data
})
</script>

<template>
  <h1>{{ screenId }}</h1>
</template>
