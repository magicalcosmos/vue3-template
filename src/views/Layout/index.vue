<!--
 * @Author: your name
 * @Date: 2023-01-11 10:23:56
 * @LastEditors: zhangpeng
 * @LastEditTime: 2023-04-12 11:38:13
 * @FilePath: /Leopard/src/views/Layout/index.vue
 * @Description:
-->
<template>
  <div class="app-wrapper d-flex flex-column">
    <Header />
    <div class="out-app-main">
      <AppMain />
    </div>
    <Teleport to="body">
      <FloatingBall v-model="progressStore.percentage" :visible="progressStore.visible" @click="goToTaskMonitorList" />
    </Teleport>
  </div>
</template>

<script lang="ts">
  import { FloatingBall } from '@/components';
  import Header from './header/index.vue';
  import AppMain from './AppMain/index.vue';
</script>

<script setup lang="ts">
  import { $paths } from '@/router';
  import { ProgressStore } from '@/store';

  const $router = useRouter();
  const progressStore = ProgressStore();
  /**
   * 跳转至任务列表
   */
  const goToTaskMonitorList = () => {
    $router.push({ path: $paths.TesterPath.MyTaskMonitorList });
  };
</script>
