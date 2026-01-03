<template>
  <!-- Modal to add a new study -->
  <UModal v-model:open="props.openModalAddStudy">
    <template #content>
      <UCard class="sm:max-w-lg w-full mx-auto" :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-white/5',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Adicionar novo estudo
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 cursor-pointer"
                     @click="closeModal"/>
          </div>
        </template>

        <div class="space-y-6">
          <div>
            <UForm :schema="schema" :state="state" class="flex flex-col justify-center items-center gap-3 w-full"
                   @submit="addNewStudy">
              <UFormField label="Título" name="title" class="w-full">
                <UInput placeholder="Digite um título" v-model="state.title" class="w-full"/>
              </UFormField>
              <UFormField label="Descrição" name="description" class="w-full">
                <UTextarea placeholder="Digite uma descrição" v-model="state.description" class="w-full"/>
              </UFormField>

              <div class="flex justify-end gap-3 mt-4 w-full">
                <UButton variant="soft" color="gray" @click="closeModal" label="Cancelar"/>
                <UButton type="submit" :loading="loading" class="cursor-pointer" label="Adicionar Tarefa"
                         color="primary"
                         icon="i-heroicons-plus-20-solid"/>
              </div>
            </UForm>
          </div>
        </div>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {z} from "zod";
import {reactive, ref} from "vue";
import DateUtils from "@/utils/DateUtils.ts";
import {useCalendarStore} from "@/stores/calendar.ts";

const toast = useToast();
const dateUtils = new DateUtils();
const calendarStore = useCalendarStore();

const emit = defineEmits(["update:openModalView", "update:closeModalAddStudy"]);

const props = defineProps({
  openModalAddStudy: {
    type: Boolean,
    required: true,
  },
  numberDay: {
    type: Number,
    required: true,
  },
  currentMonthName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  }
})

const loading = ref(false);

const schema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string()
});

const state = reactive({
  title: "",
  description: ""
});

const addNewStudy = async () => {
  const resultValidation = schema.safeParse(state);

  if (!resultValidation.success) {
    toast.add({
      title: 'Erro',
      description: "Erro ao validar os dados, verifique os campos!",
      color: 'red',
      icon: 'i-heroicons-exclamation-circle'
    });
    return;
  }

  loading.value = true;
  const dateStudy = dateUtils.getDate(props.year, props.currentMonthName, props.numberDay);

  try {
    const response = await calendarStore.registerNewStudy({
      title: state.title,
      description: state.description,
      studyDate: dateStudy
    });

    if (response.getError()) {
      toast.add({
        title: 'Erro',
        description: "Erro ao registrar estudo, verifique os dados e tente novamente!",
        color: 'red',
        icon: 'i-heroicons-exclamation-circle'
      });
      return;
    }

    toast.add({
      title: 'Sucesso',
      description: response.getResponse() as string,
      color: 'green',
      icon: 'i-heroicons-check-circle'
    });

    state.title = "";
    state.description = "";

    emit("update:closeModalAddStudy", true);
  } finally {
    loading.value = false;
  }
}

const closeModal = () => {
  emit("update:openModalView", true);
}
</script>