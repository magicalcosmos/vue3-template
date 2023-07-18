<template>
  <div class="login">
    <div class="login-container">
      <el-form
        ref="ruleFormRef"
        :model="state.loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <h3 class="title text-left">{{ $t('login.login') }} {{ config.productName }}</h3>
        <el-form-item prop="username">
          <el-input v-model="state.loginForm.username" type="text" :placeholder="$t('login.username_placeholder')">
            <template #prefix>
              <i class="iconfont icon-username"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="state.loginForm.password"
            name="password"
            :type="Dict.LOGIN.PASSWORD"
            autocomplete="on"
            :placeholder="$t('login.password_placeholder')"
          >
            <template #prefix>
              <i class="iconfont icon-password"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button
            ref="loginButtonRef"
            class="locked-size"
            type="primary"
            :loading="state.loading"
            @click.prevent="handleLogin(ruleFormRef)"
          >
            {{ $t('login.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { ButtonInstance, FormInstance } from 'element-plus';
  import { common, Dict, Log } from '@/utils';
  import { IUserInfo } from '@/interface';
  import { Authorization, UserInformation } from '@/api';

  import config from '../../../package.json';

  import type { AxiosError, AxiosResponse } from 'axios';
  import { LocalStorage } from '@/utils';
  import { LicenseStore, UserStore } from '@/store';
  import $router, { $paths } from '@/router';

  const licenseStore = LicenseStore();
  const userStore = UserStore();
  const { t } = useI18n();

  const loginButtonRef = ref<ButtonInstance>();

  /** Note: 定义完成后input才能输入 */
  const ruleFormRef = ref<FormInstance>();
  const state = reactive({
    loading: false,
    loginForm: {
      username: '',
      password: '',
    } as IUserInfo,
  });

  /**
   * 验证用户名
   * @param rule
   * @param value
   * @param callback
   */
  const validateUserName = (rule: object, value: string, callback: Function) => {
    if (value.length < 1) {
      callback(new Error(t('login.account_rule')));
    } else {
      callback();
    }
  };

  /**
   * 验证密码
   * @param rule
   * @param value
   * @param callback
   */
  const validatePassword = (rule: object, value: string, callback: Function) => {
    if (value.length < 1) {
      callback(new Error(t('login.password_rule')));
    } else {
      callback();
    }
  };
  // 登录输入规则
  const loginRules = reactive({
    username: [
      {
        required: true,
        trigger: 'blur',
        validator: validateUserName,
      },
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        validator: validatePassword,
      },
    ],
  });

  /**
   * 根据权限跳转至首页
   */
  const goHomeRouter = () => {
    let path = $paths.AdminPath.UserList;
    const role = userStore.role;
    if ((role & Dict.ROLES.TESTER) > 0) {
      path = $paths.TesterPath.ProjectList;
    } else if ((role & Dict.ROLES.ADMIN) > 0) {
      path = $paths.AdminPath.UserList;
    } else if ((role & Dict.ROLES.TESTERMANAGER) > 0) {
      path = $paths.TestManagerPath.TestDashboard;
    }
    $router.push({
      path: path,
      query: {
        currentPath: path,
      },
    });
  };
  /**
   * 获取用户信息
   */
  const getUserInformation = () => {
    common
      .getUserInformation()
      .then(() => {
        goHomeRouter();
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          $router.push({ path: $paths.CommonPath.InvalidLicense });
        }
      });
  };
  /**
   * 登录
   * @param formEl form data
   */
  const handleLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
      return;
    }
    state.loading = true;
    await formEl.validate((valid, fields) => {
      if (valid) {
        Authorization.Login(state.loginForm)
          .then((result: AxiosResponse) => {
            const newData = result.data as TAuthResult;
            LocalStorage.set({
              key: Dict.LOGIN.TOKEN,
              value: newData.accessToken,
            });
            // 登录时显示许可证到期提示 2021-12-28
            licenseStore.setCloseTips({
              closeTips: 0,
            });
            if (LocalStorage.get(Dict.LOGIN.LANG)) {
              UserInformation.edit(LocalStorage.get(Dict.LOGIN.LANG)).then(() => {
                getUserInformation();
              });
            } else {
              getUserInformation();
            }
          })
          .catch((error: AxiosError) => {
            state.loading = false;
            Log.error(error);
          });
      } else {
        state.loading = false;
        Log.error('error submit!', fields);
      }
    });
  };
  /**
   * 绑定Enter事件
   */
  const bindEnter = () => {
    document.onkeydown = function (e: KeyboardEvent) {
      // 兼容FF和IE和Opera
      var code = e.key;
      if (code === 'Enter') {
        loginButtonRef.value?.ref?.click();
      }
    };
  };

  const unbindEnter = () => {
    document.onkeydown = null;
  };

  // 初始化
  onMounted(() => {
    bindEnter();
  });

  onBeforeUnmount(() => {
    unbindEnter();
  });
</script>
