<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Plus, Upload, UploadIcon } from 'lucide-vue-next'

import ScreenService from '@/services/screen.service'
import { useScreenStore } from '@/stores/screens'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import {
  SheetTrigger,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetDescription,
} from '@/components/ui/sheet'
import { ref } from 'vue'

const data = useScreenStore()
const { isPending, isError, mutateAsync } = ScreenService.useAddContent()
const isOpenModal = ref(false)

const contentSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  type: z.string().min(1, 'El tipo de contenido es requerido'),
  duration: z.coerce.number().min(1, 'La duración debe ser un número mayor a 0'),
  file: z
    .instanceof(Array<File>)
    .refine(
      (file) => ['image/png', 'image/jpeg'].includes(file?.[0]?.type),
      'Only PNG or JPEG files are allowed',
    )
    .refine(
      (file) => file?.[0]?.size < 2 * 1024 * 1024,
      'El tamaño del archivo no puede superar los 2 MB',
    )
    .transform((files) => files?.[0]), // Convert FileList to File
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(contentSchema),
  initialValues: {
    title: '',
    type: '',
    duration: 0,
    file: [],
  },
})

const handleFormSubmit = handleSubmit(async (values) => {
  console.log(values)
  if (!data.currentScreen?.id) return
  const form = new FormData()
  form.append('file', values.file)
  form.append('title', values.title)
  form.append('type', values.type)
  form.append('duration', values.duration.toString())
  form.append('startAt', '44444')
  form.append('endAt', '5555')
  await mutateAsync({ screenId: data.currentScreen?.id, form })
  if (isError.value) {
  }
  isOpenModal.value = false
})
</script>
<template>
  <Sheet v-model:open="isOpenModal">
    <SheetTrigger as-child>
      <Button variant="ghost"><Plus /> Añadir Contenido</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle class="flex gap-2"> <Upload /> Añadir contenido {{ isPending }} {{ isError }}</SheetTitle>
        <SheetDescription>Añadir contenido a la pantalla seleccionada</SheetDescription>
      </SheetHeader>
      <form @submit="handleFormSubmit" class="grid gap-4">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Titulo</FormLabel>
            <FormControl>
              <Input placeholder="Titulo del conteido" v-bind="componentField" />
            </FormControl>
          </FormItem>
          <FormMessage />
        </FormField>

        <FormField v-slot="{ componentField }" name="type">
          <FormItem>
            <FormLabel>Tipo de contenido</FormLabel>
            <FormControl>
              <Input placeholder="Tipo de conteido" v-bind="componentField" />
            </FormControl>
          </FormItem>
          <FormMessage />
        </FormField>

        <FormField v-slot="{ componentField }" name="duration">
          <FormItem>
            <FormLabel>Duración del contenido</FormLabel>
            <FormControl>
              <Input placeholder="Duración en segundos" v-bind="componentField" />
            </FormControl>
          </FormItem>
          <FormMessage />
        </FormField>

        <FormField v-slot="{ handleChange, handleBlur }" name="file">
          <FormItem>
            <FormLabel>Archivo</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                multiple="multiple"
                @change="
                  (event: Event) => {
                    handleChange(event)
                  }
                "
                @blur="handleBlur"
              />
            </FormControl>
          </FormItem>
          <FormDescription>Solo archivos PNG y JPEG menores a 2MB son permitidos.</FormDescription>
          <FormMessage />
        </FormField>

        <Button :disabled="isPending " :loading="isPending">
          <UploadIcon />
          Subir Contenido
        </Button>
      </form>
    </SheetContent>
  </Sheet>
</template>
