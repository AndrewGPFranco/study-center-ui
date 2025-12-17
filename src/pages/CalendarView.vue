<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <AppHeader />
        <main class="grow container mx-auto px-4 py-8">
            <StudyCalendar />
        </main>
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import StudyCalendar from '@/components/calendar/StudyCalendar.vue'
</script>