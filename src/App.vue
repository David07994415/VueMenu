<script setup>
import { RouterLink, RouterView } from 'vue-router'
const base = import.meta.env.BASE_URL
console.log('base', base)
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="d-flex justify-content-start align-items-center gap-3">
        <RouterLink :to="`${base}`">Menu(Week 1)</RouterLink>
        <RouterLink :to="`${base}register`">Register(Week 2)</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
</style>
