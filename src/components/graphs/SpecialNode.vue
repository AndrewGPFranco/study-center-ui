<template>
  <div class="special-node group flex flex-col items-center gap-2">
    <div
        :class="['outer-circle w-[120px] h-[120px] rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl', nodeStyles?.gradient, nodeStyles?.shadow, nodeStyles?.hoverShadow]">

      <div
          class="inner-circle w-[100px] h-[100px] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">

        <div class="node-icon flex items-center justify-center">
          <UIcon name="i-heroicons-academic-cap" :class="['w-8 h-8', nodeStyles?.text]"/>
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
import {computed} from "vue";
import {Handle, Position} from '@vue-flow/core'

interface Props {
  data: {
    label: string
  },
  color: string
}

const props = defineProps<Props>();

const nodeStyles = computed(() => {
  const styles: Record<string, { gradient: string, shadow: string, hoverShadow: string, text: string }> = {
    green: {
      gradient: 'from-green-300 to-green-500',
      shadow: 'shadow-green-500/30',
      hoverShadow: 'hover:shadow-green-500/40',
      text: 'text-green-600'
    },
    blue: {
      gradient: 'from-blue-300 to-blue-500',
      shadow: 'shadow-blue-500/30',
      hoverShadow: 'hover:shadow-blue-500/40',
      text: 'text-blue-600'
    },
    red: {
      gradient: 'from-red-300 to-red-500',
      shadow: 'shadow-red-500/30',
      hoverShadow: 'hover:shadow-red-500/40',
      text: 'text-red-600'
    },
    yellow: {
      gradient: 'from-yellow-300 to-yellow-500',
      shadow: 'shadow-yellow-500/30',
      hoverShadow: 'hover:shadow-yellow-500/40',
      text: 'text-yellow-600'
    },
    purple: {
      gradient: 'from-purple-300 to-purple-500',
      shadow: 'shadow-purple-500/30',
      hoverShadow: 'hover:shadow-purple-500/40',
      text: 'text-purple-600'
    },
    orange: {
      gradient: 'from-orange-300 to-orange-500',
      shadow: 'shadow-orange-500/30',
      hoverShadow: 'hover:shadow-orange-500/40',
      text: 'text-orange-600'
    }
  };

  return styles[props.color] || styles.green;
});
</script>