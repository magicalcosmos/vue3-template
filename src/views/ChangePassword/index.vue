<template>
  <div class="change-password">
    <div class="change-password-header">
      <div class="title big-banner">
        {{ $t('user.change_password') }}
      </div>
    </div>
    <div class="change-password-content">
      <div class="container">
        <el-form
          ref="ruleForm"
          class="change-password-form"
          size="large"
          label-width="120px"
          :model="state.userForm"
          :rules="state.userRule"
        >
          <el-form-item :label="$t('profile.username')" prop="username">
            <div class="username">{{ userStore.username }}</div>
          </el-form-item>
          <el-form-item :label="$t('profile.old_password')" prop="password">
            <el-input
              type="password"
              v-model.trim="state.userForm.password"
              :placeholder="$t('profile.please_enter_a_old_password')"
            />
          </el-form-item>
          <el-form-item :label="$t('profile.new_password')" prop="newPassword">
            <el-input
              type="password"
              v-model.trim="state.userForm.newPassword"
              :placeholder="$t('profile.please_enter_a_new_password')"
            />
          </el-form-item>
          <el-form-item :label="$t('profile.confirm_password')" prop="againPassword">
            <el-input
              type="password"
              v-model.trim="state.userForm.againPassword"
              :placeholder="$t('profile.please_enter_your_new_password_again')"
            />
          </el-form-item>
          <el-form-item class="change-password-from-footer">
            <el-button class="locked-size" plain @click="onClickCancel()">
              {{ $t('profile.cancel') }}
            </el-button>
            <el-button
              :loading="state.loading"
              class="locked-size confirm-button"
              type="primary"
              @click="onClickSave()"
            >
              {{ $t('profile.determine') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import userInformation from '@/api/userInformation';
  import { ElMessage } from 'element-plus';
  import { UserStore } from '@/store';
  import { AxiosError } from 'axios';

  const { t } = useI18n();
  const userStore = UserStore();
  const $router = useRouter();

  const state = reactive({
    userForm: {
      password: '',
      newPassword: '',
      againPassword: '',
    },
    userRule: {},
    loading: false,
  });

  /**
   * 验证密码
   */
  const validate = () => {
    if (!state.userForm.password) {
      ElMessage.error(t('profile.old_password_not_empty'));
      return false;
    }

    if (state.userForm.password.length < 6) {
      ElMessage.error(t('user.password_rule_message'));
      return false;
    }

    if (!state.userForm.newPassword) {
      ElMessage.error(t('profile.new_password_not_empty'));
      return false;
    }

    if (state.userForm.newPassword.length < 6) {
      ElMessage.error(t('user.password_rule_message'));
      return false;
    }

    if (state.userForm.newPassword !== state.userForm.againPassword) {
      ElMessage.error(t('profile.not_match_password'));
      return false;
    }
    return true;
  };

  /**
   * 确定修改密码
   */
  const onClickSave = () => {
    if (!validate()) {
      return;
    }
    state.loading = true;
    userInformation.changePassword(state.userForm.password, state.userForm.newPassword, (error: AxiosError) => {
      state.loading = false;
      if (error) {
        let message = '';
        if (error.response) {
          switch (error.response.status) {
            case 400:
              message = 'profile.old_password_incorrect';
              break;
            case 416:
              message = 'profile.oldnew_password_notsame';
              break;
          }
        }
        ElMessage.error(message ? t(message) : error.message);
      } else {
        ElMessage.success(t('profile.change_succeed'));
        onClickCancel();
      }
    });
  };

  const onClickCancel = () => {
    $router.go(-1);
  };
</script>
