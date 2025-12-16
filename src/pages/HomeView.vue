<template>
  <h1>O seu Roadmap de estudos</h1>

  <ColorModeButton/>

  <router-link :to="{ name: 'graph-view' }" class="link">Buscar roadmaps</router-link>
  <UButton @click=authStore.logout()>
    Logout
  </UButton>
  <router-link :to="{ name: 'login-view' }" class="link">Efetuar login</router-link>
</template>

<script lang="ts" setup>
import {useAuthStore} from "@/stores/auth.ts";

const authStore = useAuthStore()
</script>