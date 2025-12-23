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
              {{ numberDay }} de {{ currentMonthName }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 cursor-pointer"
                     @click="closeModalView"/>
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
</template>

<script setup lang="ts">
const props = defineProps({
  numberDay: {
    type: Number,
    required: true,
  },
  currentMonthName: {
    type: String,
    required: true,
  },
  openModalView: {
    type: Boolean,
    required: true,
  }
})

const emit = defineEmits(["update:openModalView", "update:openModalAddStudy"]);

const closeModalView = () => emit("update:openModalView", true);

const openModalAddStudyAndCloseModalView = () => {
  emit("update:openModalView", true);
  emit("update:openModalAddStudy", true);
}
</script>