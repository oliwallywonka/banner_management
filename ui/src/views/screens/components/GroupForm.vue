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
import GroupService from '@/services/group.service'

const { isPending, isError, mutateAsync } = GroupService.useCreate()
const isOpenModal = ref(false)

const contentSchema = z.object({
  name: z.string().min(1, 'El Nombre es requerido'),
})

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(contentSchema),
  initialValues: {
    name: '',
  },
})

const handleFormSubmit = handleSubmit(async (values) => {
  await mutateAsync({ name: values.name })
  if (isError.value) {
  }
  isOpenModal.value = false
})
</script>
<template>
  <Sheet v-model:open="isOpenModal">
    <SheetTrigger as-child>
      <Button variant="ghost"><Plus /> Nuevo grupo</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle> Nuevo Grupo {{ isPending }} {{ isError }}</SheetTitle>
        <SheetDescription>Nuevo grupo de pantallas</SheetDescription>
        {{ JSON.stringify(values) }}
      </SheetHeader>
      <form @submit="handleFormSubmit" class="grid gap-4">
        <!--GROUP NAME-->
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Nombre del grupo</FormLabel>
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
