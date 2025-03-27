import type { Screen, ScreenStatus } from '@/models/screen'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSocket } from './socket'
import { events } from './groups'

export const useScreenPreviewStore = defineStore('screenPreview', () => {
  const io = useSocket()
  const screenPreview = ref<Screen>()

  function listenEvents() {
    if (!io.socket) return
    if (!io.credentials) return
    console.log('LISTENING SCREEN PREVIEW EVENTS')

    io.socket.on(events.SCREEN_UPDATE_STATUS, (data: Screen) => {
      console.log('update status')
      if (data.code !== io.credentials!.code) return
      // AL REALIZAR UN UPDATE DE STATUS OBTENEMOS EL CONTENIDO
      screenPreview.value = data
    })

    io.socket?.on(events.SCREEN_CONTENT_PLAY, (screensCodes: string[]) => {
      console.log('PLAYING', screensCodes)
      if (!screensCodes.includes(io.credentials!.code)) return
      setScreenStatus('playing')
    })

    io.socket?.on(events.SCREEN_CONTENT_PAUSE, (screensCodes: string[]) => {
      console.log('PAUSED', screensCodes)
      if (!screensCodes.includes(io.credentials!.code)) return
      setScreenStatus('paused')
    })

    io.socket?.on(events.SCREEN_CONTENT_STOP, (screensCodes: string[]) => {
      console.log('STOPPED', screensCodes)
      if (!screensCodes.includes(io.credentials!.code)) return
      setScreenStatus('stopped')
    })
  }

  function setScreenStatus(status: ScreenStatus = 'active') {
    io.socket?.emit(events.SCREEN_UPDATE_STATUS, { code: io.credentials!.code, status })
  }

  return {
    screenPreview,
    listenEvents,
    setScreenStatus,
  }
})
