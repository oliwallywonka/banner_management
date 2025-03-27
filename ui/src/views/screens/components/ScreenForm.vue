<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Plus, UploadIcon } from 'lucide-vue-next'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  SheetTrigger,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetDescription,
} from '@/components/ui/sheet'
import screenService from '@/services/screen.service'
import type { Group } from '@/models/group'

const props = defineProps<{
  group: Group
}>()

const { isPending, isError, mutateAsync } = screenService.useCreate()
const isOpenModal = ref(false)

const contentSchema = z.object({
  name: z.string().min(1, 'El Nombre es requerido'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(contentSchema),
  initialValues: {
    name: '',
  },
})

const handleFormSubmit = handleSubmit(async (values) => {
  await mutateAsync({
    name: values.name,
    groupId: props.group.id!,
    screenId: values.name,
    status: 'unregistered',
  })
  if (isError.value) {
  }
  isOpenModal.value = false
})
</script>
<template>
  <Sheet v-model:open="isOpenModal">
    <SheetTrigger as-child>
      <Button><Plus /></Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle> Nueva Pantalla </SheetTitle>
        <SheetDescription>Nueva pantalla</SheetDescription>
      </SheetHeader>
      <form @submit="handleFormSubmit" class="grid gap-4">
        <!--GROUP NAME-->
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Nombre de la pantalla</FormLabel>
            <FormControl>
              <Input placeholder="Nombre" v-bind="componentField" />
            </FormControl>
          </FormItem>
          <FormMessage />
        </FormField>

        <Button :disabled="isPending" :loading="isPending">
          <UploadIcon />
          Guardar
        </Button>
      </form>
    </SheetContent>
  </Sheet>
</template>
