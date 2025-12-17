<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-pulse">
      </div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-pulse"
        style="animation-delay: 1s;"></div>
    </div>

    <UCard
      class="w-full max-w-md shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10 transition-all hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/50">
      <template #header>
        <div class="text-center space-y-2">
          <div class="flex justify-center mb-4">
            <div
              class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-white" />
            </div>
          </div>

          <h1
            class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Bem-vindo de volta!
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Acesse sua conta para continuar
          </p>
        </div>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-5 flex flex-col justify-center items-center">
        <div class="space-y-4">
          <UFormGroup label="Email" name="email" required>
            <UInput v-model="form.usernameOrEmail" placeholder="Email ou Username" icon="i-heroicons-envelope" size="lg"
              class="transition-all" />
          </UFormGroup>

          <UFormGroup label="Senha" name="password" required>
            <UInput v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Mínimo 6 caracteres"
              icon="i-heroicons-lock-closed" size="lg" />
            <template #trailing>
              <UButton color="gray" variant="link" :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                @click="showPassword = !showPassword" :padded="false" />
            </template>
          </UFormGroup>
        </div>

        <UButton type="submit" block size="lg" :loading="loading"
          class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg">
          <span class="font-semibold">Entrar na conta</span>
        </UButton>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const showPassword = ref(false)

const form = reactive({
  usernameOrEmail: '',
  password: ''
})

const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, 'Email/Username é obrigatório'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(100, 'A senha deve ter no máximo 100 caracteres')
})

async function handleLogin() {
  const resultValidation = loginSchema.safeParse(form);

  if (!resultValidation.success) {
    toast.add({
      title: 'Erro',
      description: "Erro ao validar os dados"
    });
    return;
  }

  loading.value = true

  try {
    const responseAPI = await authStore.login(form)

    if (responseAPI.getError()) {
      toast.add({
        title: 'Erro ao fazer login',
        description: String(responseAPI.getResponse()),
        icon: 'i-heroicons-x-circle',
        color: 'red'
      })
      return
    }

    await router.push('/')
  } catch (error) {
    console.error('Login error:', error)
    toast.add({
      title: 'Erro inesperado',
      description: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes pulse {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.5;
  }
}
</style>