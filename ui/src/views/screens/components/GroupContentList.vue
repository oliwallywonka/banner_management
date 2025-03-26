<script setup lang="ts">
import { Radio } from 'lucide-vue-next'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import ContentScreenForm from './GroupContentForm.vue'
import type { Group } from '@/models/group'
import { baseURL } from '@/services/api'

defineProps<{
  group: Group
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex gap-2 items-center">
        <Radio />
        {{ 'Contenido para ' + group.name }}
      </CardTitle>
      <ContentScreenForm :groupId="group.id!" />
      <CardDescription>Lista de contenido disponible</CardDescription>
    </CardHeader>
    <CardContent class="grid md:grid-cols-2 gap-2">
      <p v-if="group.groupContents?.length === 0">No hay contenido para este grupo</p>
      <div
        v-for="item of group.groupContents"
        :key="item.id"
        class="grid grid-rows-[100px,auto,auto] gap-3 items-center p-4 rounded-md border"
      >
        <img
          v-if="item.content.type === 'IMAGE'"
          :src="`${baseURL.slice(0,-7)}/uploads/${item.content.url}`"
          alt="Imagen de ejemplo"
          class="w-full h-[100px] object-cover object-center rounded-md"
        />
        <img
          v-if="item.content.type === 'INVENTORY'"
          src="/inventory.jpeg"
          alt="Imagen de ejemplo"
          class="w-full h-[100px] object-cover object-center rounded-md"
        />
        <div class="flex flex-col gap-2">
          <p>{{ item.content.title }}</p>
          <span>{{ item.content.type }}</span>
        </div>
        <!-- <Button> Asignar </Button> -->
      </div>
    </CardContent>
  </Card>
</template>
