<template>
  <UApp>
    <RouterView />
  </UApp>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from './stores/auth';

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const token = authStore.getToken()

  if (token == null)
    await router.push('/auth/login')
  else {
    const decoded = jwtDecode(token)

    if (decoded.exp) {
      const dateValidation = new Date(decoded.exp * 1000)

      if (dateValidation < new Date()) {
        authStore.logout()
        await router.push('/auth/login')
      }
    }
  }
})
</script>