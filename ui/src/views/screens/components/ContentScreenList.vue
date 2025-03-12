<script setup lang="ts">
import { Radio } from 'lucide-vue-next'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import screenService from '@/services/screen.service'

const props = defineProps<{
  screenId: number
}>()

const { data } = screenService.useGetById(ref(props.screenId))
</script>

<template>
  <Card class="md:col-span-2">
    <CardHeader>
      <CardTitle class="flex gap-2 items-center">
        <Radio /> Contenido para TV asdfa sdf-as df-a-sd -f-a-sdf
      </CardTitle>
      <CardDescription>Lista de contenido disponible</CardDescription>
    </CardHeader>
    <CardContent class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      <div
        v-for="item of data?.contentScreens"
        :key="item.id"
        class="grid grid-rows-[100px,auto,auto] gap-3 items-center p-4 rounded-md border"
      >
        <img
          :src="`http://localhost:3000/uploads/${item.content.url}`"
          alt="Imagen de ejemplo"
          class="w-full h-[100px] object-cover object-center rounded-md"
        />
        <div class="flex flex-col gap-2">
          <p>{{ item.content.title }}</p>
          <span>{{ item.content.type }}</span>
        </div>
        <Button> Asignar </Button>
      </div>
    </CardContent>
  </Card>
</template>
