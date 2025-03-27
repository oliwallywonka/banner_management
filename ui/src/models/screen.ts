export type ScreenStatus =
  | 'active'
  | 'disconnected'
  | 'playing'
  | 'paused'
  | 'stopped'
  | 'unregistered'

export interface Screen {
  id?: number
  groupId: number
  name: string
  code: string
  status: 'active' | 'disconnected' | 'playing' | 'paused' | 'stopped' | 'unregistered'
  createdAt?: number
  updatedAt?: number
}

export interface CreateScreen {
  groupId: number;
  screenId: string;
  name: string;
  status: ScreenStatus;
}
