<template>
  <router-view />
</template>

<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  router.beforeEach((to, from) => {
  });
</script>
