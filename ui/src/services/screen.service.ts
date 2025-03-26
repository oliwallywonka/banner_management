import type { AxiosInstance } from 'axios'

import ApiClient from './api'
import type { Screen } from '@/models/screen'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { Response } from '@/models/response'
import type { Ref } from 'vue'

export default new (class ScreenService {
  public service: AxiosInstance
  constructor() {
    this.service = ApiClient
  }

  useGetAll() {
    return useQuery({
      queryKey: ['screen_get_all'],
      queryFn: async () => {
        return await this.service
          .get<Response<Screen[]>>('screens')
          .then((res) => {
            return res.data.data
          })
          .catch((err) => {
            throw err
          })
      },
    })
  }

  useGetById(id: Ref<number>) {
    return useQuery({
      queryKey: [`screen_get_by_id-${id.value}`],
      queryFn: async () => {
        return await this.service
          .get<Response<Screen>>(`screens/${id.value}`)
          .then((res) => {
            return res.data.data
          })
          .catch((err) => {
            throw err
          })
      },
    })
  }

  useCreate() {
    return useMutation({
      mutationKey: ['screen_create'],
      mutationFn: async (payload: Screen) => {
        return await this.service
          .post<Screen>('screens', payload)
          .then((res) => {
            return res.data
          })
          .catch((err) => {
            throw err
          })
      },
    })
  }
})()
