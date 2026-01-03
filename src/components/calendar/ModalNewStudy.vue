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
            <UForm class="flex flex-col justify-center gap-3">
              <UFormField label="Título">
                <UInput placeholder="Digite um título" v-model="title"/>
              </UFormField>
              <UFormField label="Descrição">
                <UInput placeholder="Digite uma descrição" v-model="description"/>
              </UFormField>
            </UForm>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton @click="addNewStudy" class="cursor-pointer" label="Adicionar Tarefa" color="primary"
                     icon="i-heroicons-plus-20-solid"/>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {ref} from "vue";
import DateUtils from "@/utils/DateUtils.ts";
import {useCalendarStore} from "@/stores/calendar.ts";

const dateUtils = new DateUtils();
const calendarStore = useCalendarStore();

const toast = useToast();
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

const title = ref<string>("")
const description = ref<string>("")

const addNewStudy = async () => {
  const dateStudy = dateUtils.getDate(props.year, props.currentMonthName, props.numberDay);

  const response = await calendarStore.registerNewStudy({
    title: title.value,
    description: description.value,
    studyDate: dateStudy
  });

  if (response.getError()) {
    toast.add({
      title: 'Erro',
      description: "Erro ao registrar estudo, verifique os dados e tente novamente!"
    });
    return;
  }

  toast.add({
    title: 'Feedback',
    description: response.getResponse() as string
  });

  emit("update:closeModalAddStudy", true);
}

const closeModal = () => {
  emit("update:openModalView", true);
}
</script>