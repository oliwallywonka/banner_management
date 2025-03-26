import { defineStore } from 'pinia'
import { useSocket } from './socket'
import { ref } from 'vue'
import type { Group, GroupContent } from '@/models/group'
import type { Screen } from '@/models/screen'

export const events = {
  GROUP_LIST: 'group:list',
  GROUP_UNIQUE: 'group:unique',
  GROUP_CREATE: 'group:create',
  GROUP_CONTENT_ADD: 'group:contents:add',

  SCREEN_CREATE: 'screen:create',
  SCREEN_UPDATE_STATUS: 'screen:update:status',
  SCREEN_CONTENT_PLAY: 'screen:content:play',
  SCREEN_CONTENT_PAUSE: 'screen:content:pause',
  SCREEN_CONTENT_STOP: 'screen:content:stop',
} as const

export const useGroupStore = defineStore('groupSocket', () => {
  const io = useSocket()
  const groups = ref<Group[]>([])

  function listenEvents() {
    if (!io.socket) return
    console.log('LISTENING GROUP EVENTS')

    io.socket.emit(events.GROUP_LIST)

    io.socket.on(events.GROUP_LIST, (data) => {
      groups.value = data
    })

    io.socket.on(events.GROUP_CREATE, (data: Group) => {
      groups.value.push(data)
    })

    io.socket.on(events.GROUP_CONTENT_ADD, (data: GroupContent) => {
      groups.value = groups.value.map((group) => {
        if (group.id === data.groupId) {
          group.groupContents.push(data)
        }
        return group
      })
    })

    io.socket.on(events.SCREEN_CREATE, (data: Screen) => {
      groups.value = groups.value.map((group) => {
        if (group.id === data.groupId) {
          group.screens.push(data)
        }
        return group
      })
    })

    io.socket.on(events.SCREEN_UPDATE_STATUS, (data: Screen) => {
      groups.value = groups.value.map((group) => {
        if (group.id === data.groupId) {
          group.screens = group.screens.map((screen) => {
            if (screen.id === data.id) {
              return data
            }
            return screen
          })
        }
        return group
      })
    })
  }

  function playScreens(screenIds: number[]) {
    if (!io.socket) return
    if (!io.credentials) return
    io.socket.emit(events.SCREEN_CONTENT_PLAY, screenIds)
  }

  function pauseScreens(screenIds: number[]) {
    if (!io.socket) return
    if (!io.credentials) return
    io.socket.emit(events.SCREEN_CONTENT_PAUSE, screenIds)
  }

  function stopScreens(screenIds: number[]) {
    if (!io.socket) return
    if (!io.credentials) return
    io.socket.emit(events.SCREEN_CONTENT_STOP, screenIds)
  }

  function refreshList() {
    if (!io.socket) return
    io.socket.emit(events.GROUP_LIST)
  }

  return {
    groups,
    listenEvents,
    playScreens,
    pauseScreens,
    stopScreens,
    refreshList,
  }
})
