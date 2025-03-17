import type { Screen, ScreenStatus } from '@/models/screen'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSocket } from './socket'
import { events } from './screens'

export const useScreenPreviewStore = defineStore('screenPreview', () => {
  const io = useSocket()
  const screenPreview = ref<Screen>()

  function listenEvents() {
    if (!io.socket) return
    if (!io.credentials) return
    console.log('LISTENING SCREEN PREVIEW EVENTS')

    io.socket.on(events.SCREEN_UNIQUE, (data: Screen) => {
      console.log('UNIQUE', data)
      if (data.id !== io.credentials!.screenId) return
      screenPreview.value = data
    })

    io.socket.on(events.SCREEN_UPDATE_STATUS, (data: Screen) => {
      console.log('update status')
      if (data.id !== io.credentials!.screenId) return
      // AL REALIZAR UN UPDATE DE STATUS OBTENEMOS EL CONTENIDO
      screenPreview.value = data
    })

    io.socket?.on(events.SCREEN_CONTENT_PLAY, (screenId: number) => {
      console.log('PLAYING', screenId)
      if (screenId !== io.credentials!.screenId) return
      setScreenStatus('playing')
    })

    io.socket?.on(events.SCREEN_CONTENT_PAUSE, (screenId: number) => {
      console.log('PAUSED', screenId)
      if (screenId !== io.credentials!.screenId) return
      setScreenStatus('paused')
    })

    io.socket?.on(events.SCREEN_CONTENT_STOP, (screenId: number) => {
      console.log('STOPPED', screenId)
      if (screenId !== io.credentials!.screenId) return
      setScreenStatus('stopped')
    })
  }

  function setScreenStatus(status: ScreenStatus = 'active') {
    io.socket?.emit(events.SCREEN_UPDATE_STATUS, { id: io.credentials!.screenId, status })
  }

  function getScreen(screenId: number) {
    //io.socket?.emit(events.SCREEN_UNIQUE, screenId)
  }

  return {
    screenPreview,
    listenEvents,
    getScreen,
    setScreenStatus,
  }
})
