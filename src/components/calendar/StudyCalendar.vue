<template>
  <main class="flex flex-col items-center justify-center w-full min-h-screen">
    <h1 class="text-3xl mb-8">{{ longMonthString }}</h1>
    <section class="grid grid-cols-9 gap-4 w-full max-w-8xl p-5">
      <div v-for="amount in amountDays" :key="amount">
        <DateStudy/>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const currentDate = new Date();

const longMonthString = computed(() => {
  const monthAsString = currentDate.toLocaleString('pt-BR', {month: 'long'});
  return monthAsString.charAt(0).toUpperCase() + monthAsString.substring(1);
})

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate() + 1;
}

const amountDays = computed(() => daysInMonth(currentDate.getMonth(), currentDate.getFullYear()));
</script>