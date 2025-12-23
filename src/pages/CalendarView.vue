<template>
  <AppHeader :fixed="false"/>
  <StudyCalendar/>
  <AppFooter/>
</template>

<script setup lang="ts">
import StudyCalendar from '@/components/calendar/StudyCalendar.vue'
import AppHeader from "@/components/AppHeader.vue";
</script>