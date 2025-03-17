<script setup lang="ts">
import { ArrowRight, Monitor, Pause, Play, ScreenShare, Square } from 'lucide-vue-next'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { useScreenStore } from '@/stores/screens'

const data = useScreenStore()
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex gap-2 items-center"> <ScreenShare /> Pantallas Registradas </CardTitle>
      <CardDescription>Lista de pantallas registradas</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-3">
      <div
        v-for="item of data.screens"
        :key="item.id"
        class="grid grid-cols-[auto,1fr] gap-3 items-center p-4 rounded-md border"
      >
        <Monitor />
        <div class="flex flex-col gap-2">
          <p>{{ item.name }}</p>
          <div class="flex gap-2 items-center justify-between">
            <span
              :class="
                item.status === 'disconnected'
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-green-500 dark:text-green-400'
              "
            >
              {{ item.status }}
            </span>
            <Button variant="ghost" @click="() => data.getScreenById(item.id!)">
              Ver contenido <ArrowRight />
            </Button>
          </div>
        </div>
        <div class="flex gap-2 col-start-2">
          <RouterLink :class="buttonVariants()" :to="`/screens/${item.id}`">Preview</RouterLink>
          <Button @click="() => data.playScreen(item.id!)"> <Play /> </Button>
          <Button @click="() => data.pauseScreen(item.id!)"> <Pause /> </Button>
          <Button @click="() => data.stopScreen(item.id!)"> <Square /> </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
