<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Plus, Upload, UploadIcon } from 'lucide-vue-next'

import GroupService from '@/services/group.service'

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select'

const props = defineProps<{
  groupId: number
}>()
const { isPending, isError, mutateAsync } = GroupService.useAddContent()
const isOpenModal = ref(false)

const contentSchema = z
  .object({
    title: z.string().min(1, 'El título es requerido'),
    type: z.string().min(1, 'El tipo de contenido es requerido'),
    duration: z.coerce.number().min(1, 'La duración debe ser un número mayor a 0'),
    file: z
      .instanceof(Array<File>)
      .optional()
      .refine(
        (file) => !file || file.length === 0 || ['image/png', 'image/jpeg'].includes(file[0]?.type),
        'Only PNG or JPEG files are allowed',
      )
      .refine(
        (file) => !file || file.length === 0 || file[0]?.size < 2 * 1024 * 1024,
        'El tamaño del archivo no puede superar los 2 MB',
      )
      .transform((files) => files?.[0] ?? null), // Convert FileList to File or null
  })
  .refine(
    (data) => data.type !== 'IMAGE' || data.file, // Ensure file is required if type is "image"
    { message: 'El archivo es requerido para imágenes', path: ['file'] },
  )

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(contentSchema),
  initialValues: {
    title: '',
    type: 'IMAGE',
    duration: 0,
    file: [],
  },
})

const handleFormSubmit = handleSubmit(async (values) => {
  const form = new FormData()
  if (values.file) {
    form.append('file', values.file)
  }
  form.append('title', values.title)
  form.append('type', values.type)
  form.append('duration', values.duration.toString())
  await mutateAsync({ groupId: props.groupId, form })
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
        <SheetTitle class="flex gap-2">
          <Upload /> Añadir contenido {{ isPending }} {{ isError }}</SheetTitle
        >
        <SheetDescription>Añadir contenido a la pantalla seleccionada</SheetDescription>
        {{ JSON.stringify(values) }}
      </SheetHeader>
      <form @submit="handleFormSubmit" class="grid gap-4">
        <!--TITLE-->
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Titulo</FormLabel>
            <FormControl>
              <Input placeholder="Titulo del conteido" v-bind="componentField" />
            </FormControl>
          </FormItem>
          <FormMessage />
        </FormField>

        <!--TYPE-->
        <FormField v-slot="{ componentField }" name="type">
          <FormItem>
            <FormLabel>Tipo de contenido</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de contenido" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="IMAGE"> Imagen </SelectItem>
                  <SelectItem value="INVENTORY"> Inventario </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
          <FormMessage />
        </FormField>

        <!--DURATION-->
        <FormField v-slot="{ componentField }" name="duration">
          <FormItem>
            <FormLabel>Duración del contenido</FormLabel>
            <FormControl>
              <Input placeholder="Duración en segundos" v-bind="componentField" />
            </FormControl>
          </FormItem>
          <FormMessage />
        </FormField>

        <!--FILE-->
        <FormField v-if="values.type === 'IMAGE'" v-slot="{ handleChange, handleBlur }" name="file">
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

        <Button :disabled="isPending" :loading="isPending">
          <UploadIcon />
          Subir Contenido
        </Button>
      </form>
    </SheetContent>
  </Sheet>
</template>
