<template>
  <main class="min-h-screen w-full text-gray-900 dark:text-slate-200 p-4 md:p-8 font-sans selection:bg-primary-500/30">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Back Button -->
      <div class="flex justify-start">
        <UButton
            to="/"
            icon="i-heroicons-arrow-left-20-solid"
            variant="ghost"
            color="gray"
            class="hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl px-4 py-2"
        >
          Voltar
        </UButton>
      </div>

      <!-- Calendar Header -->
      <header
          class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-white/5 pb-8">
        <div>
          <h2 class="text-sm font-medium tracking-widest text-primary-500 uppercase mb-2">Plano de Estudos</h2>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {{ longMonthString }} <span
              class="text-gray-400 dark:text-slate-500 font-light">{{ currentDate.getFullYear() }}</span>
          </h1>
        </div>

        <!-- Navigation Placeholders -->
        <div class="flex items-center gap-2">
          <button @click="previousMonth"
                  class="p-2 rounded-xl cursor-pointer bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            <UIcon name="i-heroicons-chevron-left-20-solid" class="w-5 h-5"/>
          </button>
          <p
              class="px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors font-medium text-sm">
            Próximo mês
          </p>
          <button @click="nextMonth"
                  class="p-2 rounded-xl cursor-pointer bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5"/>
          </button>
        </div>
      </header>

      <!-- Calendar Body -->
      <div class="relative group">
        <!-- Glow Backdrop -->
        <div
            class="absolute -inset-1 bg-linear-to-r from-primary-500/10 to-blue-500/10 dark:from-primary-500/20 dark:to-blue-500/20 rounded-4xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <section
            class="relative bg-white/50 dark:bg-white/2 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-4xl p-6 md:p-8 shadow-xl dark:shadow-2xl">

          <!-- Weekday Headers -->
          <div class="grid grid-cols-7 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
            <div v-for="day in weekDays" :key="day" class="text-center">
              <span class="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                {{ day }}
              </span>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-3 md:gap-4">
            <div v-for="empty in startDayOffset" :key="'empty-' + empty" class=" opacity-20">
              <div class="w-full h-full border border-dashed border-gray-300 dark:border-white/10 rounded-2xl"></div>
            </div>

            <!-- Actual Days -->
            <DateStudy
                v-for="day in amountDays"
                :key="day"
                :number-day="day"
                :month="currentDate.getMonth()"
                :year="currentDate.getFullYear()"
            />
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import DateStudy from './DateStudy.vue';

let currentDate = ref(new Date());
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const longMonthString = computed(() => {
  const monthAsString = currentDate.value.toLocaleString('pt-BR', {month: 'long'});
  return monthAsString.charAt(0).toUpperCase() + monthAsString.substring(1);
});

const amountDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  return new Date(year, month + 1, 0).getDate();
});

const startDayOffset = computed(() => {
  const firstDay = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      1
  );
  return firstDay.getDay();
});

const previousMonth = () => {
  const d = new Date(currentDate.value);
  d.setMonth(d.getMonth() - 1);
  currentDate.value = d;
};

const nextMonth = () => {
  const d = new Date(currentDate.value);
  d.setMonth(d.getMonth() + 1);
  currentDate.value = d;
};

</script>