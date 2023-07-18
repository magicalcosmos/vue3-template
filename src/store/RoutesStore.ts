import { TesterPath, TestManagerPath, AdminPath } from '@/router/paths';
import { defineStore } from 'pinia';
import {
  ConstantRoutes,
  AdminRoutes,
  TesterRoutes,
  TestManagerRoutes,
  NotFoundRoutes,
  AppRouterRecordRaw,
  InvalidLicense,
  getRootRouter,
} from '@/router';

import { LicenseStore, UserStore } from '.';
import { Dict } from '@/utils';
import { NS } from './store-name';

export type TRoutesState = {
  routers?: Array<AppRouterRecordRaw>;
  addRouters?: Array<AppRouterRecordRaw>;
};

export const RoutesStore = defineStore(NS.ROUTES, {
  state: () => {
    return {
      routers: ConstantRoutes,
      addRouters: [],
    } as TRoutesState;
  },
  getters: {},
  actions: {
    initRoutes(licenseStatus: TLicenseResult) {
      function setLicenseStatus(router: Array<AppRouterRecordRaw>) {
        // 包含静态、单元、集成的许可证
        const modules = licenseStatus.license && licenseStatus.license.modules;
        // 许可证失效状态
        const moduleStatus = [
          Dict.MODULE_STATUS.EXPIRED,
          Dict.MODULE_STATUS.BEFORE,
          Dict.MODULE_STATUS.IN,
          Dict.MODULE_STATUS.EXCEPTION,
        ];
        // 许可证的key
        const moduleKey = [
          Dict.LICENSE_FUNC.STATICANALYZE,
          Dict.LICENSE_FUNC.UNITTEST,
          Dict.LICENSE_FUNC.INTEGRATION_TEST,
        ];
        moduleKey.forEach(item => {
          if (modules && router) {
            router.map((route: any) => {
              const module = modules[item];
              // 静态、单元、集成许可证不存在或过期
              if (route.meta[item] !== undefined && (module === undefined || moduleStatus.includes(module.status))) {
                route.meta[item] = Dict.LICENSE_STATUS.INVALID;
              }
            });
          }
        });
      }
      return new Promise((resolve, reject) => {
        const licenseStore = LicenseStore();
        const userStore = UserStore();
        const role = userStore.role;
        const accessedRouters: Array<AppRouterRecordRaw> = [];
        let rootRouter: AppRouterRecordRaw;
        // 获取根目录
        if ((role & Dict.ROLES.TESTER) > 0) {
          rootRouter = getRootRouter(TesterPath.ProjectList);
        } else if ((role & Dict.ROLES.TESTERMANAGER) > 0) {
          rootRouter = getRootRouter(TestManagerPath.TestDashboard);
        } else {
          rootRouter = getRootRouter(AdminPath.UserList);
        }
        rootRouter.children = [];
        if (rootRouter && rootRouter.children !== undefined) {
          // 页面路由
          if ((role & Dict.ROLES.SUPERADMIN) > 0 || (role & Dict.ROLES.ADMIN) > 0) {
            rootRouter.children.push(...AdminRoutes);
            Object.assign(rootRouter.children, AdminRoutes);
          }
          if ((role & Dict.ROLES.TESTER) > 0) {
            setLicenseStatus(TesterRoutes);
            rootRouter.children.push(...TesterRoutes);
          }
          if (licenseStatus.licenseStatus > Dict.LICENSE_STATUS.NORMAL) {
            //accessedRouters = accessedRouters.concat(InvalidLicenseRoutes);
          }
          if ((role & Dict.ROLES.TESTERMANAGER) > 0) {
            setLicenseStatus(TestManagerRoutes);
            rootRouter.children.push(...TestManagerRoutes);
          }
        }

        // 测试人员与测试经理公用页面
        // if ((role & Dict.ROLES.TESTER) > 0 || (role & Dict.ROLES.TESTERMANAGER) > 0) {
        //   accessedRouters = accessedRouters.concat(CommonWithHeaderRouter);
        // }
        rootRouter.children.push(InvalidLicense);
        accessedRouters.push(rootRouter);
        accessedRouters.push(NotFoundRoutes);
        this.setRoutes({
          addRouters: accessedRouters,
          routers: accessedRouters,
        });
        licenseStore.setLicenseStatus(licenseStatus);
        if (accessedRouters.length < 1) {
          reject('No roles!');
        } else {
          resolve(accessedRouters);
        }
      });
    },
    setRoutes(route: TRoutesState) {
      if (route.addRouters) {
        this.addRouters = route.addRouters;
      }
      if (route.routers) {
        this.routers = ConstantRoutes.concat(route.routers);
      }
    },
  },
});
