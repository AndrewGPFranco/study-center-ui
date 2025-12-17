<template>
  <div
    class="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 relative overflow-hidden flex flex-col">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full filter blur-3xl opacity-40 animate-blob">
      </div>
      <div
        class="absolute top-[30%] -left-[10%] w-[50%] h-[50%] bg-blue-50/50 dark:bg-blue-900/10 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000">
      </div>
    </div>

    <AppHeader />

    <main class="grow flex flex-col justify-center px-4 py-16 relative z-10">
      <UContainer>
        <div class="text-center mb-20 space-y-6 relative">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4 animate-fade-in-up">
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Seu hub de estudos
          </div>

          <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
            Domine seu <span class="bg-linear-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent relative">
              Aprendizado
              <svg class="absolute w-full h-3 -bottom-1 left-0 text-indigo-200 dark:text-indigo-800 -z-10"
                viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Explore roadmaps detalhados e organize sua rotina com um calendário inteligente.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto cursor-pointer">
          <UCard
            class="group relative overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-2 hover:ring-indigo-500 dark:hover:ring-indigo-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20 bg-white dark:bg-gray-900 h-full"
            @click="goTo('graph-view')">
            <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
              <UIcon name="i-heroicons-map" class="w-32 h-32 text-indigo-600" />
            </div>

            <div class="p-4 space-y-6 relative z-10">
              <div
                class="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <UIcon name="i-heroicons-map" class="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div>
                <h3
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Roadmaps</h3>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed">Trilhas de conhecimento estruturadas para
                  guiar seu desenvolvimento do zero ao avançado.</p>
              </div>

              <div
                class="pt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-2 transition-transform">
                Explorar Trilhas
                <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 ml-2" />
              </div>
            </div>
          </UCard>

          <UCard
            class="group relative overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-2 hover:ring-blue-500 dark:hover:ring-blue-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20 bg-white dark:bg-gray-900 h-full"
            @click="goTo('calendar-view')">
            <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
              <UIcon name="i-heroicons-calendar" class="w-32 h-32 text-blue-600" />
            </div>

            <div class="p-4 space-y-6 relative z-10 cursor-pointer">
              <div
                class="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <UIcon name="i-heroicons-calendar" class="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>

              <div>
                <h3
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Calendário</h3>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed">Gerenciamento visual de tempo. Agende
                  revisões, provas e acompanhe sua consistência.</p>
              </div>

              <div
                class="pt-4 flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                Ver Agenda
                <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 ml-2" />
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

const router = useRouter();

function goTo(routeName: string) {
  router.push({ name: routeName });
}
</script>

<style scoped>
.animate-blob {
  animation: blob 10s infinite;
}

.animation-delay-2000 {
  animation-delay: 5s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -30px) scale(1.05);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.95);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>