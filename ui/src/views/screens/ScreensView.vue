<script setup lang="ts">
import { ArrowRight, Monitor, ScreenShare, Upload, UploadIcon } from 'lucide-vue-next'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import screenService from '@/services/screen.service'
import { ref } from 'vue'
import ContentScreenList from './components/ContentScreenList.vue'

const currentId = ref<number | undefined>()
const { data, isLoading } = screenService.useGetAll()
const { refetch } = screenService.useGetById(currentId)

function handleClick(id?: number) {
  console.log(id)
  currentId.value = id
  refetch()
}
</script>

<template>
  <div class="grid md:grid-cols-2 gap-4 p-4">
    <Card>
      <CardHeader>
        <CardTitle class="flex gap-2 items-center">
          <ScreenShare /> Pantallas Registradas
        </CardTitle>
        <CardDescription>Lista de pantallas registradas</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-3">
        <div v-if="isLoading">Cargando....</div>
        <div
          v-for="item of data"
          :key="item.id"
          class="grid grid-cols-[auto,1fr,auto] gap-3 items-center p-4 rounded-md border"
        >
          <Monitor />
          <div class="flex flex-col gap-2">
            <p>{{ item.name }}</p>
            <div class="flex gap-2">

              <span> {{ item.status }} </span>
              <RouterLink :to="`/screens/${item.id}`">Preview</RouterLink>
            </div>
          </div>
          <Button variant="ghost" @click="() => handleClick(item.id)">
            <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="flex gap-2 items-center"> <Upload /> Subir contenido </CardTitle>
        <CardDescription>Añadir contenido a la pantalla seleccionada</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="grid gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="name">Titulo</Label>
            <Input name="title" placeholder="Title of the content" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="name">Tipo de contenido</Label>
            <Input name="type" placeholder="Title of the content" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="name">Duración</Label>
            <Input name="duration" placeholder="Duración en segundos" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="name">Archivo</Label>
            <Input name="file" type="file" />
          </div>
          <Button>
            <UploadIcon />
            Subir Contenido
          </Button>
        </form>
      </CardContent>
      <CardFooter class="px-6 pb-6"> </CardFooter>
    </Card>

    <ContentScreenList v-if="currentId" :screenId="currentId" />
  </div>
</template>
