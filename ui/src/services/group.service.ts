import type { AxiosInstance } from 'axios'

import ApiClient from './api'
import type { Screen } from '@/models/screen'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { Response } from '@/models/response'
import type { CreateGroup, Group } from '@/models/group'

export default new (class GroupService {
  public service: AxiosInstance
  constructor() {
    this.service = ApiClient
  }

  useGetAll() {
    return useQuery({
      queryKey: ['group_get_all'],
      queryFn: async () => {
        return await this.service
          .get<Response<Group[]>>('groups')
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
      mutationKey: ['group_create'],
      mutationFn: async (payload: CreateGroup) => {
        return await this.service
          .post<Screen>('groups', payload)
          .then((res) => {
            return res.data
          })
          .catch((err) => {
            throw err
          })
      },
    })
  }

  useUpdate() {
    return useMutation({
      mutationKey: ['group_update'],
      mutationFn: async (payload: CreateGroup) => {
        return await this.service
          .put<Screen>('groups', payload)
          .then((res) => {
            return res.data
          })
          .catch((err) => {
            console.log(err)
            throw err
          })
      },
    })
  }

  useAddContent() {
    return useMutation({
      mutationKey: ['group_add_content'],
      mutationFn: async (data: { groupId: number; form: FormData }) => {
        return await this.service
          .post<Response<Screen>>(`groups/${data.groupId}/content`, data.form)
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
