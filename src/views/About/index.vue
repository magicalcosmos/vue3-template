<!--
 * @Author: zhangpeng
 * @Date: 2023-02-08 11:13:57
 * @LastEditors: zhangpeng
 * @LastEditTime: 2023-02-08 17:18:27
 * @FilePath: /Leopard/src/views/About/index.vue
 * @Description: 关于页面
-->
<template>
  <div class="version-info m-auto d-flex align-items-center">
    <div class="text-center" style="width: 1000px; height: 550px">
      <div class="row">
        <div class="col-6">
          <el-form class="login-form" label-position="left">
            <div class="title text-left">{{ config.productName }}</div>
            <div class="title-content text-left">
              {{ $t('version.version') }} {{ config.version || '' }} &nbsp;&nbsp; ({{
                state.version.deployStatus || config.deployStatus
              }}) <br />
              rocket core {{ config.rocketCoreVersion || '' }} <br />
              prometheus {{ config.prometheusVersion || '' }} <br />
              clang/libTooling/libLLVM {{ config.libVersion || '' }}
            </div>
            <div class="content text-left">{{ config.productName }}</div>
            <div class="content text-left">&copy; 2019-{{ new Date().getFullYear() }} {{ $t('license.ticpsh') }}</div>
            <div v-if="showPrivacyPolicy" class="text-left">
              <span class="privacy-policy pointer" @click="handleClick">{{ $t('common.privacy_policy') }}</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import config from '../../../package.json';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { LicenseStore } from '@/store';

  const { t } = useI18n();
  const licenseStore = LicenseStore();

  const state = reactive({
    version: {} as TObject,
    showPrivacyPolicy: false,
  });

  const getVersion = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const URL = `${protocol}//${host}/version.json`;
    axios
      .get(URL)
      .then(response => {
        state.version = response.data;
      })
      .catch(error => {
        if (error.response) {
          ElMessage.error(error.response.statusText);
        }
      });
  };

  const handleClick = () => {
    ElMessageBox.alert(t('common.privacy_policy_desc'), t('common.privacy_policy'), {
      confirmButtonText: t('button.confirm_compiler_modified_button'),
    });
  };

  const showPrivacyPolicy = computed(() => licenseStore.license?.licenseSCD !== 0);

  onMounted(() => {
    getVersion();
  });
</script>
