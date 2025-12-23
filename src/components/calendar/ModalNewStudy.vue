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
const emit = defineEmits(["update:openModalView", "update:closeModalAddStudy"]);

const props = defineProps({
  openModalAddStudy: {
    type: Boolean,
    required: true,
  }
})

const addNewStudy = () => {
  emit("update:closeModalAddStudy", true);
}

const closeModal = () => {
  emit("update:openModalView", true);
}
</script>