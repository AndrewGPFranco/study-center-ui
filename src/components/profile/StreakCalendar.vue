<template>
  <UCard class="ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900 shadow-sm">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <UIcon name="i-heroicons-fire" class="w-5 h-5 text-orange-500"/>
          Atividade
        </h3>
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Menos</span>
          <div class="flex gap-1">
            <div class="w-3 h-3 rounded-xs bg-gray-100 dark:bg-gray-800"></div>
            <div class="w-3 h-3 rounded-xs bg-indigo-200 dark:bg-indigo-900/50"></div>
            <div class="w-3 h-3 rounded-xs bg-indigo-400 dark:bg-indigo-700"></div>
            <div class="w-3 h-3 rounded-xs bg-indigo-600 dark:bg-indigo-500"></div>
          </div>
          <span>Mais</span>
        </div>
      </div>
    </template>

    <div class="overflow-x-auto pb-2">
      <div class="flex gap-1 min-w-max">
        <!-- Weeks -->
        <div v-for="(week, wIndex) in calendar" :key="wIndex" class="flex flex-col gap-1">
          <div
              v-for="(day, dIndex) in week"
              :key="dIndex"
              class="w-3 h-3 rounded-xs transition-colors duration-200 relative group"
              :class="getColor(day.count)"
          >
            <!-- Tooltip -->
            <div
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
              {{ day.count }} atividades em {{ formatDate(day.date) }}
              <div
                  class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import {computed} from 'vue';

interface DailyActivity {
  date: string;
  count: number;
}

const props = defineProps<{
  activityData: DailyActivity[];
}>();

function getColor(count: number) {
  if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
  if (count <= 2) return 'bg-indigo-200 dark:bg-indigo-900/50';
  if (count <= 5) return 'bg-indigo-400 dark:bg-indigo-700';
  return 'bg-indigo-600 dark:bg-indigo-500';
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {month: 'short', day: 'numeric'});
}

const calendar = computed(() => {
  const weeks = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  startDate.setDate(startDate.getDate() - startDate.getDay());

  let current = new Date(startDate);

  for (let w = 0; w < 52; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = current.toISOString().split('T')[0];
      const activity = props.activityData.find(a => a.date === dateStr);
      week.push({
        date: dateStr,
        count: activity ? activity.count : 0
      });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
});
</script>
