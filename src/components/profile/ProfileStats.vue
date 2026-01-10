<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <UCard v-for="(stat, index) in stats" :key="index"
           class="ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center gap-4">
        <div :class="['p-3 rounded-xl flex items-center justify-center', stat.colorClass]">
          <UIcon :name="stat.icon" class="w-6 h-6 text-white"/>
        </div>
        <div>
          <p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-0.5">{{
              stat.label
            }}</p>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</span>
            <span v-if="stat.trend"
                  :class="['text-xs font-semibold', stat.trend > 0 ? 'text-green-500' : 'text-red-500']">
              {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
            </span>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Stat {
  label: string;
  value: string | number;
  icon: string;
  colorClass: string;
  trend?: number;
}

defineProps<{
  stats: Stat[];
}>();
</script>
