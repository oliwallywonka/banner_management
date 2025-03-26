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
      if (data.id !== io.credentials!.screenId) return
      // AL REALIZAR UN UPDATE DE STATUS OBTENEMOS EL CONTENIDO
      screenPreview.value = data
    })

    io.socket?.on(events.SCREEN_CONTENT_PLAY, (screensIds: number[]) => {
      console.log('PLAYING', screensIds)
      if (!screensIds.includes(io.credentials!.screenId)) return
      setScreenStatus('playing')
    })

    io.socket?.on(events.SCREEN_CONTENT_PAUSE, (screensIds: number[]) => {
      console.log('PAUSED', screensIds)
      if (!screensIds.includes(io.credentials!.screenId)) return
      setScreenStatus('paused')
    })

    io.socket?.on(events.SCREEN_CONTENT_STOP, (screensIds: number[]) => {
      console.log('STOPPED', screensIds)
      if (!screensIds.includes(io.credentials!.screenId)) return
      setScreenStatus('stopped')
    })
  }

  function setScreenStatus(status: ScreenStatus = 'active') {
    io.socket?.emit(events.SCREEN_UPDATE_STATUS, { id: io.credentials!.screenId, status })
  }

  return {
    screenPreview,
    listenEvents,
    setScreenStatus,
  }
})
