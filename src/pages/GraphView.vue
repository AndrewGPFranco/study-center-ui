<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950">
    <AppHeader />
    <main class="grow">
      <div class="h-full">
        <GraphView />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
import GraphView from '@/components/graphs/GraphAssembly.vue';
</script>
