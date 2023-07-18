import router from './router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

import LocalStorage from '@/utils/localStorage';
import { UserStore, LicenseStore } from './store';
import common from '@/utils/common';
import { Dict } from '@/utils';
import { CommonPath } from '@/router/paths';
import { ElMessage } from 'element-plus';

import config from '../package.json';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

function setTitleDynamically() {
  document.title = config.productName;
}

/**
 * 路由守卫
 * @param role
 * @param to
 * @param next
 */
function nextPage(role: number, to: RouteLocationNormalized, next: NavigationGuardNext) {
  if (!role) {
    // 刷新浏览器重新获取用户信息
    common
      .getUserInformation()
      .then(() => {
        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
      .catch(error => {
        if (error && error.message === 'Network Error') {
          ElMessage.error(error.message);
        } else {
          next({
            path: CommonPath.Login,
          });
        }
      });
  } else {
    next();
  }
}

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start();
  setTitleDynamically();
  const userStore = UserStore();
  const licenseStore = LicenseStore();
  if (to.meta.isRequiredAuthentication === false) {
    // 不需要鉴权
    next();
  } else if (LocalStorage.getToken()) {
    // 用户角色
    const role = userStore.role;
    // 页面不受License控制
    if (to.meta.isWithoutRequiredLicense) {
      nextPage(role, to, next);
    } else {
      // 许可证全局状态
      const licenseStatus = licenseStore.license?.licenseStatus;
      if (to.meta && (to.meta.staticAnalyze || to.meta.unitTest || to.meta.integrationTest)) {
        // 静态、单元、集成许可证不存在或过期
        next({
          path: CommonPath.InvalidLicense,
        });
      } else if (to.path === CommonPath.Login) {
        // 登录页
        next({
          path: CommonPath.HomePage,
        });
        NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so handle it manually.
      } else if (licenseStatus === Dict.LICENSE_STATUS.USERS_OVER_LIMIT) {
        // 用户人数超过上限
        next({
          path: CommonPath.InvalidLicense,
        });
      } else {
        nextPage(role, to, next);
      }
    }
  } else {
    // 退出登录
    next({
      path: CommonPath.Login,
    });
  }
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
