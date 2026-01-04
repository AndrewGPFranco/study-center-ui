<template>
  <!-- Modal to view studies -->
  <UModal v-model:open="props.openModalView">
    <template #content>
      <UCard class="sm:max-w-lg w-full mx-auto" :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-white/5',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ numberDay }} de {{ currentMonthName }} de {{ year }}
            </h3>
            <div class="flex items-center gap-2">
               <span v-if="studies?.length"
                     class="text-xs font-medium px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                  {{ studies.length }} tarefas
               </span>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 cursor-pointer"
                       @click="closeModalView"/>
            </div>
          </div>
        </template>

        <div class="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar px-1">
          <div v-if="studies && studies.length > 0" class="space-y-3">
            <div v-for="study in studies" :key="study.id"
                 class="group relative p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300 shadow-xs hover:shadow-md">

              <div class="flex justify-between items-start gap-3 mb-2">
                <h4 class="font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {{ study.title }}
                </h4>
                <UBadge v-if="study.isFinalized" color="green" variant="subtle" size="xs">Concluído</UBadge>
                <UBadge v-else-if="study.isExpired" color="red" variant="subtle" size="xs">Não concluído</UBadge>
                <UBadge v-else color="gray" variant="subtle" size="xs">Pendente</UBadge>
              </div>

              <p v-if="study.description"
                 class="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line line-clamp-3">
                {{ study.description }}
              </p>

              <div
                  class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-400">
                <span>Criado em {{ formatDate(study.createdAt) }}</span>

                <div class="flex gap-2">
                  <UTooltip text="Concluir" v-if="!study.isFinalized && !study.isExpired">
                    <UButton class="cursor-pointer" color="green" variant="ghost" icon="i-heroicons-check-circle"
                             size="xs" @click.stop="handleFinish(study)"/>
                  </UTooltip>

                  <UDropdownMenu v-if="!isPastDate" :items="getItems(study)"
                                 :popper="{ placement: 'bottom-end', strategy: 'fixed' }">
                    <UButton class="cursor-pointer" color="gray" variant="ghost"
                             icon="i-heroicons-ellipsis-vertical-20-solid" size="xs"/>
                  </UDropdownMenu>
                </div>
              </div>
            </div>
          </div>

          <div v-else
               class="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
            <UIcon name="i-heroicons-calendar-days" class="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"/>
            <p v-if="isPastDate">
              Não houve registros de estudos para este dia.
            </p>
            <p v-else class="text-gray-500 dark:text-gray-400 text-center font-medium">
              Ainda não há tarefas registradas para este dia.
            </p>
          </div>
        </div>

        <template #footer v-if="!isPastDate">
          <div class="flex justify-end gap-3">
            <UButton @click="openModalAddStudyAndCloseModalView" class="cursor-pointer" label="Adicionar Tarefa"
                     color="primary" icon="i-heroicons-plus-20-solid"/>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import DateUtils from "@/utils/DateUtils.ts";
import type {IStudyTask} from "@/types/utils.ts";
import {useCalendarStore} from "@/stores/calendar.ts";

const props = defineProps({
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
  },
  openModalView: {
    type: Boolean,
    required: true,
  }
})

const toast = useToast();
const studies = ref<IStudyTask[]>([]);

const emit = defineEmits(["update:openModalView", "update:openModalAddStudy"]);

const closeModalView = () => emit("update:openModalView", true);

const openModalAddStudyAndCloseModalView = () => {
  emit("update:openModalView", true);
  emit("update:openModalAddStudy", true);
}

const getItems = (study: IStudyTask) => [
  // [{
  //   label: 'Editar',
  //   icon: 'i-heroicons-pencil-square-20-solid',
  //   onClick: () => console.log(study.id),
  // }],TODO: implementar funcionalidade de editar um estudo
  [{
    label: 'Excluir',
    icon: 'i-heroicons-trash-20-solid',
    class: 'text-red-500 dark:text-red-400',
    onClick: () => deleteTask(study.id)
  }]
]

const handleFinish = async (study: IStudyTask) => {
  const response = await calendarStore.markAsCompleted(study.id);

  if (response.getError()) {
    toast.add({
      title: 'Erro',
      description: "Erro ao marcar estudo como concluído, tente novamente!",
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

  studies.value = [];

  await getStudies()
}

const dateUtils = new DateUtils();
const calendarStore = useCalendarStore();
const isPastDate = ref<boolean>(false);

const handleDateInThePast = async () => {
  if (!props.openModalView) return;

  const input = {
    dayNumber: props.numberDay,
    month: props.currentMonthName,
    year: props.year
  }

  isPastDate.value = await calendarStore.handleDateInThePast(input);
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {hour: '2-digit', minute: '2-digit'}).format(date);
}

watch(() => props.openModalView, async (isOpen) => {
  if (isOpen) {
    await handleDateInThePast();
    await getStudies();
  } else
    isPastDate.value = false;
});

const getStudies = async () => {
  const responseAPI = await calendarStore.getStudiesByDate(dateUtils.getDate(props.year, props.currentMonthName, props.numberDay));

  if (!responseAPI.getError())
    studies.value = responseAPI.getResponse() as unknown as IStudyTask[];
}

const deleteTask = async (idTask: string) => {
  const response = await calendarStore.deleteTask(idTask);

  if (response.getError()) {
    toast.add({
      title: 'Erro',
      description: "Erro ao deletar estudo, tente novamente!",
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

  studies.value = [];

  await getStudies()
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 20px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>