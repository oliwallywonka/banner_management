<script setup lang="ts">
import { computed } from 'vue'
import { Monitor, Pause, Play, ScreenShare, Square, RotateCw, Plus } from 'lucide-vue-next'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GroupForm from './GroupForm.vue'
import GroupContentList from './GroupContentList.vue'
import { useGroupStore } from '@/stores/groups'
import type { Screen } from '@/models/screen'

const data = useGroupStore()

const defaultTab = computed(() => {
  return data.groups.length > 0 ? data.groups[0].id! : 1
})

function getScreensIds(screens: Screen[]) {
  return screens.map((screen) => screen.id!)
}
</script>

<template>
  <Tabs class="p-4" :default-tab="defaultTab">
    <TabsList class="grid w-full grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
      <TabsTrigger v-for="group in data.groups" :key="group.id" :value="group.id!" data-state="active">
        {{ group.name }}
      </TabsTrigger>
      <GroupForm />
    </TabsList>
    <TabsContent
      v-for="group in data.groups"
      :key="group.id"
      :value="group.id!"
      class="grid md:grid-cols-2 gap-4"
    >
      <Card>
        <CardHeader>
          <CardTitle class="flex gap-2 items-center">
            <ScreenShare /> Pantallas Registradas en {{ group.name }}
          </CardTitle>
          <CardDescription>Lista de pantallas registradas</CardDescription>
          <div class="flex gap-2 col-start-2">
            <Button @click="() => data.refreshList()">
              <Plus />
            </Button>
            <Button @click="() => data.refreshList()">
              <RotateCw />
            </Button>
            <Button @click="() => data.playScreens(getScreensIds(group.screens!))">
              <Play />
            </Button>
            <Button @click="() => data.pauseScreens(getScreensIds(group.screens!))">
              <Pause />
            </Button>
            <Button @click="() => data.stopScreens(getScreensIds(group.screens!))">
              <Square />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="grid gap-3">
          <div
            v-for="item of group.screens"
            :key="item.id"
            class="grid grid-cols-[auto,1fr] gap-3 items-center p-4 rounded-md border"
          >
            <Monitor />
            <div class="flex flex-col gap-2">
              <p>{{ item.name }}</p>
              <div class="flex gap-2 items-center justify-between">
                <span
                  :class="
                    item.status === 'disconnected' || item.status === 'unregistered'
                      ? 'text-red-500 dark:text-red-400'
                      : 'text-green-500 dark:text-green-400'
                  "
                >
                  {{ item.status }}
                </span>
                <span class="font-bold">Código: {{ item.code }}</span>
              </div>
            </div>
            <RouterLink :class="buttonVariants()" :to="`/screens/${item.id}`">Preview</RouterLink>
          </div>
        </CardContent>
      </Card>
      <GroupContentList :group="group" />
    </TabsContent>
  </Tabs>
</template>
