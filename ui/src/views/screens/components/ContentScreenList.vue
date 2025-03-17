<script setup lang="ts">
import { Radio } from 'lucide-vue-next'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useScreenStore } from '@/stores/screens'
import ContentScreenForm from './ContentScreenForm.vue'

const data = useScreenStore()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex gap-2 items-center">
        <Radio />
        {{
          data.currentScreen
            ? 'Contenido para ' + data.currentScreen?.name
            : 'Seleccione una pantalla'
        }}
      </CardTitle>
      <ContentScreenForm v-if="data.currentScreen" />
      <CardDescription>Lista de contenido disponible</CardDescription>
    </CardHeader>
    <CardContent class="grid md:grid-cols-2 gap-2">
      <p v-if="data.currentScreen?.contentScreens.length === 0">
        No hay contenido para este pantalla
      </p>
      <div
        v-for="item of data.currentScreen?.contentScreens"
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
