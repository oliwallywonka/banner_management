import type { Screen } from './screen'

export interface Group {
  id?: number
  name: string
  screens: Screen[]
  groupContents: GroupContent[]
}

export interface CreateGroup {
  name: string
}

export interface GroupContent {
  id?: number
  groupId: number
  contentId: number
  createdAt: number
  updatedAt: number
  content: Content
}

export type ContentType = 'IMAGE' | 'INVENTORY'

export interface Content {
  id?: number
  title: string
  type: ContentType
  url: string | null
  duration: number
  createdAt: number
  updatedAt: number
}
