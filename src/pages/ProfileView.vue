<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
    <UContainer>
      <div class="space-y-6">
        <!-- Back Button -->
        <div class="flex justify-start">
          <UButton
              to="/"
              icon="i-heroicons-arrow-left-20-solid"
              variant="ghost"
              color="gray"
              class="hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl px-4 py-2"
          >
            Voltar
          </UButton>
        </div>

        <!-- Header -->
        <ProfileHeader :user="user"/>

        <!-- Stats -->
        <ProfileStats :stats="stats"/>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Content: Streak Calendar -->
          <div class="lg:col-span-2 space-y-6">
            <StreakCalendar :activity-data="activityData"/>

            <!-- Additional Mock Content to fill space if needed, or leave for future -->
            <UCard class="ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <template #header>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Conquistas Recentes</h3>
              </template>
              <div class="flex gap-4 overflow-x-auto pb-2">
                <div v-for="i in 5" :key="i"
                     class="flex flex-col items-center gap-2 min-w-[100px] p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-default">
                  <div
                      :class="['w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br shadow-sm', ['from-yellow-100 to-yellow-200', 'from-blue-100 to-blue-200', 'from-green-100 to-green-200', 'from-purple-100 to-purple-200', 'from-pink-100 to-pink-200'][i-1]]">
                    {{ ['🏆', '📚', '🔥', '💡', '🚀'][i - 1] }}
                  </div>
                  <span class="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">Nível {{ i }}</span>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Sidebar: Active Roadmaps -->
          <div class="lg:col-span-1">
            <ActiveRoadmaps :roadmaps="roadmaps"/>
          </div>
        </div>
      </div>
    </UContainer>


  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import ProfileHeader from '@/components/profile/ProfileHeader.vue';
import ProfileStats from '@/components/profile/ProfileStats.vue';
import StreakCalendar from '@/components/profile/StreakCalendar.vue';
import ActiveRoadmaps from '@/components/profile/ActiveRoadmaps.vue';

const user = reactive({
  name: 'Andrew Franco',
  username: 'andrewgo',
  avatar: 'https://github.com/AndrewGPFranco.png',
  bio: 'Full Stack Developer apaixonado por Java, Vue.js e arquitetura de software. Sempre aprendendo algo novo!',
  location: 'São Paulo, SP',
  joinedAt: 'Jan 2024',
  socials: {
    github: 'AndrewGPFranco',
    linkedin: 'AndrewGPFranco'
  }
});

const stats = ref([
  {label: 'Dias Ativos', value: 142, icon: 'i-heroicons-calendar-days', colorClass: 'bg-blue-500', trend: 12},
  {label: 'Roadmaps', value: 3, icon: 'i-heroicons-map', colorClass: 'bg-indigo-500'},
  {label: 'Tarefas', value: 87, icon: 'i-heroicons-check-circle', colorClass: 'bg-green-500', trend: 5},
  {label: 'Longest Streak', value: 21, icon: 'i-heroicons-fire', colorClass: 'bg-orange-500'},
]);

const activityData = ref(generateRandomActivity());

function generateRandomActivity() {
  const data = [];
  const end = new Date();
  const start = new Date();
  start.setFullYear(end.getFullYear() - 1);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (Math.random() > 0.4) {
      data.push({
        date: d.toISOString().split('T')[0] || '',
        count: Math.floor(Math.random() * 8) + 1
      });
    }
  }
  return data;
}

const roadmaps = ref([
  {id: '1', title: 'Vue.js Mastery', progress: 75, nextStep: 'Composition API Advanced'},
  {id: '2', title: 'System Design', progress: 30, nextStep: 'Load Balancing'},
  {id: '3', title: 'Docker Essentials', progress: 10, nextStep: 'Containerization Basics'},
]);
</script>
