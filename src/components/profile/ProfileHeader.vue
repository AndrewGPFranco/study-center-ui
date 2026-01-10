<template>
  <div
      class="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
    <div class="relative group">
      <UAvatar
          :src="user.avatar"
          :alt="user.name"
          size="3xl"
          class="ring-4 ring-indigo-50 dark:ring-indigo-900/30 w-32 h-32 text-4xl"
          :ui="{ rounded: 'rounded-2xl' }"
      />
      <div
          class="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white dark:border-gray-900 w-6 h-6 rounded-full"
          title="Online"></div>
    </div>

    <div class="flex-1 text-center md:text-left space-y-3 w-full">
      <div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ user.name }}</h1>
          <p class="text-gray-500 dark:text-gray-400 font-medium">@{{ user.username }}</p>
        </div>
      </div>

      <p class="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
        {{ user.bio }}
      </p>

      <div class="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
        <div class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <UIcon name="i-heroicons-map-pin" class="w-4 h-4"/>
          {{ user.location }}
        </div>
        <div class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <UIcon name="i-heroicons-calendar" class="w-4 h-4"/>
          Membro desde {{ user.joinedAt }}
        </div>
        <div v-if="user.socials?.github"
             class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer">
          <UIcon name="i-simple-icons-github" class="w-4 h-4"/>
          GitHub
        </div>
        <div v-if="user.socials?.linkedin"
             class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
          <UIcon name="i-simple-icons-linkedin" class="w-4 h-4"/>
          LinkedIn
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserProfile {
  name: string;
  username: string;
  avatar?: string;
  bio: string;
  location: string;
  joinedAt: string;
  socials?: {
    github?: string;
    linkedin?: string;
  };
}

defineProps<{
  user: UserProfile;
}>();
</script>
