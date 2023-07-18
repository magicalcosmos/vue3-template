<template>
  <header class="header">
    <ul class="header-list" v-if="state.isMenu">
      <li class="header-item product-name">
        <router-link to="/">
          <i class="iconfont icon-logo"></i>
        </router-link>
      </li>
      <li class="header-item left-items">
        <el-menu
          router
          :ellipsis="false"
          :default-active="$route.path"
          class="r-menu-rocket"
          mode="horizontal"
          @select="handleSelect"
        >
          <!-- project management -->
          <el-sub-menu index="0" :showIconArrow="false" popper-class="header-popper-menu" v-auth="'admin&tester'">
            <template #title>
              <span>{{ $t('project.project_management') }}</span>
            </template>
            <!-- current project -->
            <el-menu-item-group
              v-if="recentProjects.length"
              class="border-bottom"
              :title="$t('profile.current_project')"
            >
              <el-menu-item :index="project.url" :title="project.name">
                <i class="iconfont icon-item"></i><span>{{ project.name }}</span>
              </el-menu-item>
            </el-menu-item-group>
            <!-- recent project list -->
            <el-menu-item-group
              v-if="recentProjects.length > 1"
              class="border-bottom"
              :title="$t('profile.recent_project')"
            >
              <el-menu-item
                v-for="(item, index) in recentProjects.slice(1)"
                :key="index"
                :index="item.url"
                :title="recentProjects[index + 1].name"
              >
                <i class="iconfont icon-item"></i><span>{{ item.name }}</span>
              </el-menu-item>
            </el-menu-item-group>
            <!-- project list -->
            <!-- <el-menu-item-group class='border-bottom' v-auth="'tester'" > -->
            <el-menu-item-group class="border-bottom">
              <el-menu-item :index="$paths.TesterPath.ProjectList">
                <span>{{ $t('project.project_list') }}</span>
              </el-menu-item>
            </el-menu-item-group>
            <!-- task monitor -->
            <el-menu-item-group :title="$t('profile.task_monitoring')" class="m0">
              <el-menu-item v-auth="'tester'" :index="$paths.TesterPath.MyTaskMonitorList">
                <span>{{ $t('profile.my_task_monitoring') }}</span>
              </el-menu-item>
              <el-menu-item v-auth="'admin'" :index="$paths.AdminPath.AllTaskMonitorList">
                <span>{{ $t('profile.all_task_monitoring') }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <!-- static analysis -->
          <el-sub-menu
            :showIconArrow="false"
            popper-class="header-popper-menu"
            v-auth="`tester_${Dict.VERSION_TYPE.STATIC_ANALYSIS}`"
            index="1"
          >
            <template #title>
              <span>{{ $t('static_analysis.name') }}</span>
            </template>
            <el-menu-item
              v-show="isEmptyObject(project)"
              v-auth="'tester'"
              :index="
                $paths.TesterPath.AnalysisHome.replace(':projectId', project.projectId || '').replace(
                  ':versionId',
                  project.lastVersion?.versionId,
                )
              "
            >
              <span>{{ $t('static_analysis.home') }}</span>
            </el-menu-item>
            <el-menu-item :index="$paths.TesterPath.DetectionTemplateList">
              <span>{{ $t('static_analysis.detection_template') }}</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- unit test -->
          <el-sub-menu
            :showIconArrow="false"
            popper-class="header-popper-menu"
            v-auth="`tester_admin_${Dict.VERSION_TYPE.UNIT_TEST}`"
            index="2"
          >
            <template #title>
              <span>{{ $t('profile.unit_test') }}</span>
            </template>
            <el-menu-item
              v-show="isEmptyObject(project)"
              v-auth="'tester'"
              :index="
                $paths.TesterPath.UnitTesting.replace(':projectId', project.projectId || '').replace(
                  ':versionId',
                  project.lastVersion?.versionId,
                )
              "
            >
              <span>{{ $t('static_analysis.home') }}</span>
            </el-menu-item>
            <el-menu-item v-show="isShow(project)" class="popper-menu-empty">
              <span>{{ $t('project.no_data') }}</span>
            </el-menu-item>
            <el-menu-item
              v-auth="'admin'"
              :index="$paths.TesterPath.UserDefinedFieldsUnitTest.replace(':domain', Dict.VERSION_TYPE.UNIT_TEST)"
            >
              <span>{{ $t('button.user_defined_fields') }}</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- integration test -->
          <el-sub-menu
            :showIconArrow="false"
            popper-class="header-popper-menu"
            v-auth="`tester_admin_${Dict.VERSION_TYPE.INTEGRATION_TEST}`"
            index="3"
          >
            <template #title>
              <span>{{ $t('project.hyper_test') }}</span>
            </template>
            <el-menu-item
              v-show="isEmptyObject(project)"
              v-auth="`tester_${Dict.VERSION_TYPE.INTEGRATION_TEST}`"
              :index="
                $paths.TesterPath.IntegratedTesting.replace(':projectId', project.projectId || '').replace(
                  ':versionId',
                  project.lastVersion?.versionId,
                )
              "
            >
              <span>{{ $t('static_analysis.home') }}</span>
            </el-menu-item>
            <el-menu-item v-show="isShow(project)" class="popper-menu-empty">
              <span>{{ $t('project.no_data') }}</span>
            </el-menu-item>
            <el-menu-item
              v-auth="'admin'"
              :index="
                $paths.TesterPath.UserDefinedFieldsIntegrationTest.replace(
                  ':domain',
                  Dict.VERSION_TYPE.INTEGRATION_TEST,
                )
              "
            >
              <span>{{ $t('button.user_defined_fields') }}</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- system management -->
          <el-sub-menu
            :showIconArrow="false"
            popper-class="header-popper-menu"
            v-auth="'admin&testerManager'"
            index="4"
          >
            <template #title>
              <span>{{ $t('profile.system_management') }}</span>
            </template>
            <el-menu-item v-auth="'admin'" :index="$paths.AdminPath.UserList">
              <span>{{ $t('profile.user_management') }}</span>
            </el-menu-item>
            <el-menu-item v-auth="'admin'" :index="$paths.AdminPath.License">
              <span>{{ $t('profile.license_management') }}</span>
            </el-menu-item>
            <el-menu-item v-auth="'testerManager'" :index="$paths.TestManagerPath.TestDashboard">
              <span>{{ $t('profile.test_dashboard') }}</span>
            </el-menu-item>
            <el-menu-item v-show="logGoOn" :index="$paths.AdminPath.LogView">
              <span>{{ $t('profile.system_log_view') }}</span>
            </el-menu-item>
            <el-menu-item v-auth="'admin'" :index="$paths.AdminPath.CompileEnvList">
              <span>{{ $t('button.compiler_env') }}</span>
            </el-menu-item>
            <el-menu-item v-auth="'admin'" :index="$paths.AdminPath.TestReportTemplate">
              <span>{{ $t('profile.report_template') }}</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </li>
      <li class="header-item right-items">
        <div class="license-expires-container" v-show="licenseExpiredStatus() && !closeTips">
          <svg class="icon icon-warning" aria-hidden="true">
            <use xlink:href="#icon-warning-tip" />
          </svg>
          <span class="license-expires-tips">{{ $t('license.license_expires_tips') }}</span>
          <i class="iconfont icon-icon-nopass icon-close-circle" @click="handleCloseTips"></i>
        </div>
        <div class="user-info">
          <el-menu
            :ellipsis="false"
            :default-active="$route.path"
            class="r-menu-rocket"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-sub-menu index="/help" popper-class="header-popper-menu">
              <template #title>
                <span class="name">{{ $t('help.name') }}</span>
              </template>
              <el-menu-item class="help" :index="$paths.CommonPath.FAQ">
                <span>{{ $t('help.faq') }}</span>
              </el-menu-item>
              <el-menu-item :index="$paths.CommonPath.Manual">
                <span>{{ $t('help.manual') }}</span>
              </el-menu-item>
            </el-sub-menu>
            <span class="spacer"></span>
            <el-sub-menu index="/users" popper-class="header-popper-menu">
              <template #title>
                <i class="iconfont icon-user"></i>
                {{ userStore.username }}
              </template>
              <el-menu-item :index="$paths.CommonPath.ChangePassword">
                <i class="header-icon iconfont icon-alter"></i>{{ $t('user.modify_personal_information') }}
              </el-menu-item>
              <el-menu-item index="1">
                <i class="header-icon iconfont icon-quit"></i>{{ $t('login.logout') }}
              </el-menu-item>
              <el-menu-item @click="handleToVersion">
                <i class="header-icon iconfont icon-about"></i>{{ $t('profile.system_about') }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { common, RWebsocket, Log, LocalStorage, Dict } from '@/utils';
  import { UserInformation } from '@/api';
  import { IKV } from '@/interface';
  import { useI18n } from 'vue-i18n';
  import { LicenseStore, ProjectStore, UserStore, TProject, WebsocketStore } from '@/store';
  import { useRoute } from 'vue-router';
  import { ElMessageBox } from 'element-plus';
  import $router, { $paths } from '@/router';

  const $route = useRoute();

  const { t, locale } = useI18n();

  const licenseStore = LicenseStore();
  const projectStore = ProjectStore();
  const websocketStore = WebsocketStore();
  const userStore = UserStore();

  const project = ref<TProject>({});

  const state = reactive({
    lang: '',
    subTitle: '',
    isMenu: true,
    isAlertVisible: false,
  });

  const closeTips = computed(() => licenseStore.closeTips);
  const logGoOn = computed(() => Log.getLogLevel());

  const recentProjects = computed(() => {
    const recentProjectArr = projectStore.recentProjects;
    setCurrentProject(recentProjectArr?.[0] || {});
    return recentProjectArr || [];
  });

  watch(
    () => websocketStore.websocketMessage,
    (data: TObject) => {
      if (data.code === Dict.CMD.CLOSE) {
        ElMessageBox.alert(t('login.login_other_place'), t('dialog.tip')).then(() => {
          signOut();
        });
      }
      switch (data.cmd) {
        case Dict.CMD.UPDATE:
          if (data.domain === Dict.DOMAIN.USER) {
            if (data.data.username === userStore.username) {
              window.location.reload();
            }
          }
          break;
        default:
      }
    },
  );

  /**
   *
   * @param currentProject
   */
  const setCurrentProject = currentProject => {
    project.value = currentProject;
  };

  /**
   * 判断许可制是否即将过期
   */
  const licenseExpiredStatus = () => {
    const modules = licenseStore.license?.license?.modules;
    const staticAnalyze = modules?.[Dict.LICENSE_FUNC.STATICANALYZE];
    const unitTest = modules?.[Dict.LICENSE_FUNC.UNITTEST];
    const integrationTest = modules?.[Dict.LICENSE_FUNC.INTEGRATION_TEST];
    return (
      staticAnalyze?.status === Dict.MODULE_STATUS.WILL_EXPIRE ||
      unitTest?.status === Dict.MODULE_STATUS.WILL_EXPIRE ||
      integrationTest?.status === Dict.MODULE_STATUS.WILL_EXPIRE
    );
  };

  /**
   * 路由
   * @param data
   */
  const observeRouter = (data: string) => {
    state.isMenu = true;
    if (data.indexOf('overview_info') !== -1) {
      const type = $route.params.type;
      state.isMenu = false;
      state.subTitle = type ? t(`version.${type}_file_list`) : '';
    } else if (data.indexOf('static_analysis_overview') !== -1) {
      state.isMenu = false;
    }
  };

  /**
   * 帮助选择
   * @param path 跳转路径
   */
  const handleSelect = (path: string) => {
    if (!path) {
      return;
    }
    switch (path) {
      case $paths.CommonPath.FAQ:
      case $paths.CommonPath.Manual:
        window.open(`${path}`);
        break;
      default:
        if (path.indexOf('/') > -1) {
          $router.push({
            path: path,
          });
        } else {
          signOut();
        }
    }
  };

  /**
   * 语言切换
   * @param customLang
   */
  const handleLang = (customLang?: string): void => {
    state.lang = customLang || LocalStorage.getLang() || 'zh-CN';
    const formateLang = state.lang.replace('-', '_');
    locale.value = formateLang;
    const langObject: IKV = {
      key: Dict.LOGIN.LANG,
      value: formateLang,
    };
    LocalStorage.set(langObject);
    UserInformation.edit(formateLang);
  };

  /**
   * 跳转到关于页面
   */
  const handleToVersion = () => {
    const { href } = $router.resolve({
      path: $paths.CommonPath.About,
    });
    window.open(href);
  };

  /**
   * 退出登录
   */
  const signOut = () => {
    common.signOut();
  };

  /**
   * 测试人员+管理员，没有项目，下拉列表显示“编译环境，函数/用例信息，测试报告模版”，
   * 有项目，下拉列表有显示“测试主页，编译环境，函数/用例信息，测试报告模版”
   * @date 2021-09-13
   */
  const isShow = (project: TObject) => {
    const privilege = userStore.privilege;
    const admin = privilege?.admin;
    const tester = privilege?.tester;
    return !project && tester && !admin;
  };

  /**
   * 判断当前项目是否是一个空项目
   * @date 2021-11-09
   */
  const isEmptyObject = (obj: TObject) => {
    return obj && obj.lastVersion && obj.lastVersion.versionId;
  };

  /**
   * 关闭许可证到期提示
   */
  const handleCloseTips = () => {
    licenseStore.setCloseTips({
      closeTips: 1,
    });
  };

  /**
   * 获取当前项目
   */
  const getCurrentProjects = () => {
    if ((userStore.role & Dict.ROLES.TESTER) > 0) {
      // reload header item again
      projectStore.getCurrentProjects();
    }
  };

  onMounted(() => {
    handleLang();
    observeRouter($route.path);
    getCurrentProjects();
  });
  RWebsocket.start();
</script>
