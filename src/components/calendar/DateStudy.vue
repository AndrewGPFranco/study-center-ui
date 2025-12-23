<template>
  <div class="relative group cursor-pointer transition-all duration-300 ease-out" :class="[
    isToday ? 'scale-105 z-10' : 'hover:scale-102'
  ]">
    <!-- Background Card -->
    <section @click="openModalView = !openModalView"
             class="w-full aspect-square md:aspect-video flex flex-col items-center justify-between p-3 rounded-2xl border transition-all duration-300"
             :class="[
        isToday
          ? 'bg-primary-500/10 border-primary-500/50 shadow-lg shadow-primary-500/20'
          : 'bg-gray-100/50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-primary-500/30 dark:hover:border-white/25 hover:shadow-xl'
      ]">
      <!-- Day Number -->
      <div class="w-full flex justify-between items-start">
        <span class="text-lg font-semibold transition-colors duration-300"
              :class="isToday ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-white'">
          {{ numberDay }}
        </span>

        <!-- Today Indicator Dot -->
        <div v-if="isToday" class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
      </div>

      <!-- Task Activity Placeholders (Professional Touch) -->
      <div class="w-full flex gap-1 mt-auto"> <!-- TODO: tornar isso uma funcionalidade -->
        <div v-for="i in 3" :key="i" class="h-1 flex-1 rounded-full bg-gray-200 dark:bg-slate-700/50 overflow-hidden">
          <div v-if="i === 1" class="h-full bg-primary-500/50 w-2/3"></div>
        </div>
      </div>
    </section>

    <!-- Subtle glow effect on hover -->
    <div v-if="!isToday"
         class="absolute inset-0 bg-primary-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
    </div>
  </div>

  <!-- Modal to view studies -->
  <UModal v-model:open="openModalView">
    <template #content>
      <UCard class="sm:max-w-lg w-full mx-auto" :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-white/5',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ numberDay }} de {{ currentMonthName }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 cursor-pointer"
                     @click="openModalView = false"/>
          </div>
        </template>

        <div class="space-y-6">
          <div
              class="flex flex-col items-center justify-center py-10 px-4 bg-gray-50 dark:bg-white/2 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
            <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4"/>

            <!-- TODO add studies saved -->

            <p class="text-gray-500 dark:text-gray-400 text-center font-medium">
              Ainda não há tarefas registradas para este dia.
            </p>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton @click="openModalAddStudyAndCloseModalView" class="cursor-pointer" label="Adicionar Tarefa"
                     color="primary" icon="i-heroicons-plus-20-solid"/>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>

  <!-- Modal to add a new study -->
  <UModal v-model:open="openModalAddStudy">
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
                     @click="openModalAddStudy = false"/>
          </div>
        </template>

        <div class="space-y-6">
          <div>
            <UForm></UForm>
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
import {computed, ref} from 'vue';

const props = defineProps<{
  numberDay: number;
  month?: number;
  year?: number;
}>();

const openModalView = ref<boolean>(false);
const openModalAddStudy = ref<boolean>(false);

const openModalAddStudyAndCloseModalView = () => {
  openModalAddStudy.value = !openModalAddStudy.value;
  openModalView.value = !openModalView.value
}

const currentMonthName = computed(() => {
  const checkMonth = props.month ?? new Date().getMonth();
  const date = new Date(2000, checkMonth, 1);
  return date.toLocaleString('pt-BR', {month: 'long'});
});

const addNewStudy = () => {
  openModalAddStudy.value = false
}

const isToday = computed(() => {
  const today = new Date();
  const checkMonth = props.month ?? today.getMonth();
  const checkYear = props.year ?? today.getFullYear();

  return today.getDate() === props.numberDay && today.getMonth() === checkMonth && today.getFullYear() === checkYear;
});
</script>

<style scoped>
.scale-102 {
  transform: scale(1.02);
}
</style>