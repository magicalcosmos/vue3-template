<!--
 * @Author: your name
 * @Date: 2020-06-28 14:56:02
 * @LastEditTime: 2023-01-05 10:41:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/views/Layout/AppMain/index.vue
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component v-if="$route.meta.keepAlive" :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
      <transition name="fade" mode="out-in">
        <component v-if="!$route.meta.keepAlive" :is="Component" :key="route.name" />
      </transition>
    </router-view>
    <Loading v-show="loading" />
    <!-- Dynamic Component start -->
    <keep-alive>
      <component
        v-model="dynamicComponentStore.dynamicVisible"
        v-bind.prop="dynamicComponentStore.dynamicProps"
        :is="dynamicComponentStore.dynamicComponent"
        @save="dynamicComponentStore.dynamicSave"
        @cancel="dynamicComponentStore.dynamicCancel"
      />
    </keep-alive>
    <!-- Dynamic Component end -->
  </section>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { Loading } from '@/components';
  import { LoadingStore, DynamicComponentStore } from '@/store';
  const loadingStore = LoadingStore();
  const dynamicComponentStore = DynamicComponentStore();

  /**  全局loading加载 */
  const loading = computed(() => loadingStore.isLoading || loadingStore.upload?.isUploading);
</script>
