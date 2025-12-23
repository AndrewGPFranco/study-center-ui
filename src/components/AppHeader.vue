<template>
  <header :class="[
        'py-6 border-b border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-950/60 backdrop-blur-md',
        fixed ? 'sticky top-0 z-50' : ''
    ]">
    <UContainer class="flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <span class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Central dos Estudos
                </span>
      </router-link>

      <div class="flex items-center gap-3">
        <ColorModeButton class="cursor-pointer"/>
        <div v-if="!hasToken">
          <UButton :to="{ name: 'login-view' }" label="Login" color="gray" variant="ghost"
                   class="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"/>
        </div>
        <div v-else>
          <UButton @click="logout" label="Sair" color="gray" variant="ghost"
                   icon="i-heroicons-arrow-right-on-rectangle"
                   class="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"/>
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.ts";
import {computed} from "vue";

withDefaults(defineProps<{
  fixed?: boolean;
}>(), {
  fixed: true
});

const authStore = useAuthStore();
const hasToken = computed(() => !!authStore.token);

function logout() {
  authStore.logout();
}
</script>
