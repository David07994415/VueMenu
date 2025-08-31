<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';

const router = useRouter();


onMounted(() => {

  // 檢查 token 是否存在
  router.beforeEach((to, from, next) => {
    const token = document.cookie.includes('todolistToken=');
    // console.log('token', token);
    if (!token && to.path == '/TodoList') {
      next({ path: '/TodoLanding' });
    } else {
      next();
    }
  });
});
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
