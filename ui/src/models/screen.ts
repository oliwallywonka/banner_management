export type ScreenStatus = 'active' | 'disconnected' | 'playing' | 'paused' | 'stopped'

export interface Screen {
  id?: number
  name: string
  status: 'active' | 'disconnected' | 'playing' | 'paused' | 'stopped'
  createdAt: number
  updatedAt: number
  contentScreens: ContentScreen[]
}

export interface ContentScreen {
  id?: number
  screenId: number
  contentId: number
  startAt: string
  endAt: string
  createdAt: number
  updatedAt: number
  content: Content
}

export interface Content {
  id?: number
  title: string
  type: string
  url: string
  duration: number
  createdAt: number
  updatedAt: number
}
