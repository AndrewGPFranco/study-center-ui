<template>
  <h1>O seu Roadmap de estudos</h1>

  <ColorModeButton/>

  <router-link :to="{ name: 'graph-view' }" class="link">Buscar roadmaps</router-link>
  <UButton v-if="!hasToken">
    <router-link :to="{ name: 'login-view' }" class="link">
      Efetuar login
    </router-link>
  </UButton>
  <UButton v-else @click=logout>
    Logout
  </UButton>
</template>

<script lang="ts" setup>
import {useAuthStore} from "@/stores/auth.ts";
import {computed} from "vue";

const authStore = useAuthStore()
const hasToken = computed(() => !!authStore.token)

function logout() {
  authStore.logout()
}
</script>