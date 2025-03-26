import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'
import { ref } from 'vue'

interface Credentials {
  screenId: number
}

export const useSocket = defineStore('socket', () => {
  const socket = ref<Socket>()
  const isConnected = ref<boolean>(false)
  const credentials = ref<Credentials>()

  function connect(cred: Credentials) {
    if (socket.value) return

    // TODO: use ENV for the url
    credentials.value = cred
    socket.value = io('ws://localhost:3001', {
      auth: cred,
      autoConnect: false,
    })

    socket.value.connect()

    socket.value.on('connect', () => {
      isConnected.value = true
      console.log('CONNECTED')
    })

    socket.value.on('error', (err) => {
      console.log(err)
    })

    socket.value.on('disconnect', () => {
      isConnected.value = false
      console.log('DISCONNECTED')
    })
  }

  function disconnect() {
    if (!socket.value) return
    socket.value.removeAllListeners()
    socket.value.disconnect()
    socket.value = undefined
    isConnected.value = false
    credentials.value = undefined
  }

  return { socket, isConnected, credentials, connect, disconnect }
})
