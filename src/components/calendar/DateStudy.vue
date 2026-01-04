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

  <ModalView
      :year="year"
      :numberDay="numberDay"
      :openModalView="openModalView"
      :currentMonthName="currentMonthName"
      @update:openModalView="openModalView = false"
      @update:openModalAddStudy="openModalAddStudy = true"
  />

  <ModalNewStudy
      :year="year"
      :numberDay="numberDay"
      :currentMonthName="currentMonthName"
      :openModalAddStudy="openModalAddStudy"
      @update:openModalView="openModalAddStudy = false"
      @update:closeModalAddStudy="openModalAddStudy = false"
  />
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

const props = defineProps<{
  numberDay: number;
  month: number;
  year: number;
}>();

const openModalView = ref<boolean>(false);
const openModalAddStudy = ref<boolean>(false);

const currentMonthName = computed(() => {
  const checkMonth = props.month ?? new Date().getMonth();
  const date = new Date(2000, checkMonth, 1);
  return date.toLocaleString('pt-BR', {month: 'long'});
});

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