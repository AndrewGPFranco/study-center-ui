<template>
  <UCard class="ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900 shadow-sm h-full">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 text-indigo-500"/>
          Roadmaps em Andamento
        </h3>
        <UButton variant="link" color="gray" to="/graphs">Ver todos</UButton>
      </div>
    </template>

    <div class="space-y-6">
      <div v-for="roadmap in roadmaps" :key="roadmap.id" class="group">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              {{ roadmap.title }}</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">Próximo: {{ roadmap.nextStep }}</p>
          </div>
          <UBadge color="gray" size="xs">{{ roadmap.progress }}%</UBadge>
        </div>

        <UProgress :value="roadmap.progress" size="sm" color="indigo" class="bg-gray-100 dark:bg-gray-800"/>

        <div class="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <UButton size="xs" variant="ghost" color="indigo" trailing-icon="i-heroicons-arrow-right"
                   class="cursor-pointer">Continuar
          </UButton>
        </div>
      </div>

      <div v-if="roadmaps.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        Nenhum roadmap ativo no momento.
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface RoadmapProgress {
  id: string;
  title: string;
  progress: number;
  nextStep: string;
}

defineProps<{
  roadmaps: RoadmapProgress[];
}>();
</script>
