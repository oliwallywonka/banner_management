import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { ContentScreen, Screen, ScreenStatus } from '@/models/screen'
import { useSocket } from './socket'

export const events = {
  SCREEN_LIST: 'screen:list',
  SCREEN_UNIQUE: 'screen:unique',
  SCREEN_UPDATE_STATUS: 'screen:update:status',
  SCREEN_CONTENT_ADD: 'screen:contents:add',
  SCREEN_CONTENT_PLAY: 'screen:content:play',
  SCREEN_CONTENT_PAUSE: 'screen:content:pause',
  SCREEN_CONTENT_STOP: 'screen:content:stop',
} as const

export const useScreenStore = defineStore('screenSocket', () => {
  const io = useSocket()
  const screens = ref<Screen[]>([])
  const currentScreen = ref<Screen | undefined>()

  function listenEvents() {
    if (!io.socket) return
    console.log('LISTENING SCREEN EVENTS')

    io.socket.emit(events.SCREEN_LIST)

    io.socket.on(events.SCREEN_LIST, (data) => {
      screens.value = data
    })

    io.socket.on(events.SCREEN_UPDATE_STATUS, (data: Screen) => {
      console.log(data)
      screens.value = screens.value.map((screen) => {
        if (screen.id === data.id) {
          return data
        }
        return screen
      })
    })

    io.socket.on(events.SCREEN_UNIQUE, (data: Screen) => {
      currentScreen.value = data
    })

    io.socket.on(events.SCREEN_CONTENT_ADD, (data: ContentScreen) => {
      if (!currentScreen.value) return
      console.log('SCREEN_CONTENT_ADD')
      if (currentScreen.value.id !== data.screenId) return
      currentScreen.value.contentScreens.push(data)
    })
  }

  function setScreenStatus(status: ScreenStatus = 'active') {
    if (!io.socket) return
    if (!io.credentials) return
    io.socket.emit(events.SCREEN_UPDATE_STATUS, { id: io.credentials.screenId, status })
  }

  function getScreenById(id: number) {
    if (!io.socket) return
    io.socket.emit(events.SCREEN_UNIQUE, id)
  }

  function playScreen(screenId: number) {
    if (!io.socket) return
    if (!io.credentials) return
    io.socket.emit(events.SCREEN_CONTENT_PLAY, screenId)
  }

  function pauseScreen(screenId: number) {
    if (!io.socket) return
    if (!io.credentials) return
    io.socket.emit(events.SCREEN_CONTENT_PAUSE, screenId)
  }

  function stopScreen(screenId: number) {
    if (!io.socket) return
    if (!io.credentials) return
    io.socket.emit(events.SCREEN_CONTENT_STOP, screenId)
  }

  return {
    screens,
    currentScreen,
    listenEvents,
    setScreenStatus,
    getScreenById,
    playScreen,
    pauseScreen,
    stopScreen,
  }
})
