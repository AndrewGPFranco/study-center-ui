<template>
  <div class="special-node group flex flex-col items-center gap-2">
    <div
        class="outer-circle w-[120px] h-[120px] rounded-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/40">

      <div
          class="inner-circle w-[100px] h-[100px] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">

        <div class="node-icon flex items-center justify-center">
          <UIcon name="i-heroicons-academic-cap" class="w-8 h-8 text-green-600"/>
        </div>
      </div>
    </div>

    <div
        class="node-label max-w-[200px] text-center text-xs font-medium text-gray-800 dark:text-gray-100 leading-[1.3] px-2">
      {{ data.label }}
    </div>

    <Handle type="target" :position="Position.Top"
            class="handle w-[10px] !h-[10px] !bg-green-500 !border-2 !border-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"/>
    <Handle type="source" :position="Position.Bottom"
            class="handle w-[10px] !h-[10px] !bg-green-500 !border-2 !border-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"/>
  </div>
</template>

<script setup lang="ts">
import {Handle, Position} from '@vue-flow/core'

interface Props {
  data: {
    label: string
  }
}

defineProps<Props>()
</script>
