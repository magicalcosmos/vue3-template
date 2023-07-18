import { AppRouterRecordRaw } from '.';
import ConstantRouter from './constantRouter';
import AdminRouterData from './adminRouter';
import TesterRouterData from './testerRouter';
import TestManagerRouterData from './testManagerRouter';
import { CommonPath, KeyPath } from './paths';

const getPath = (modules, name) => {
  let path = '';
  Object.keys(modules).forEach(key => {
    if (name && key.includes(name)) {
      path = key;
    }
  });
  return path;
};

const modules = import.meta.glob(['/src/views/**/*.vue', '!/src/views/components/**/*.vue']);

/**
 * handle router data
 * @param routerData
 */
function handleRouter(routerData: Array<AppRouterRecordRaw>) {
  const traverse = (routerData: AppRouterRecordRaw[]) => {
    routerData?.map((routes: any) => {
      if (routes.name && JSON.stringify(routes.component) === '{}') {
        const path = getPath(modules, routes.name);
        if (path) {
          routes.component = modules[path];
        }
      }
      if (routes.children && routes.children.length) {
        traverse(routes.children);
      }
    });
    return routerData;
  };
  return traverse(routerData);
}

/**
 * 获取带头部的路由
 * @param redirect
 * @returns
 */
const getRootRouter = (redirect: string): AppRouterRecordRaw => {
  return {
    title: '',
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    name: 'Layout',
    hidden: true,
    redirect: redirect,
  };
};

const ConstantRoutes: Array<AppRouterRecordRaw> = [];
const CommonWithHeaderRoutes: Array<AppRouterRecordRaw> = [];
const AdminRoutes: Array<AppRouterRecordRaw> = [];
const TesterRoutes: Array<AppRouterRecordRaw> = [];
const TestManagerRoutes: Array<AppRouterRecordRaw> = [];

ConstantRoutes.push(...handleRouter(ConstantRouter));
TestManagerRoutes.push(...handleRouter(TestManagerRouterData));
AdminRoutes.push(...handleRouter(AdminRouterData));
TesterRoutes.push(...handleRouter(TesterRouterData));

const NotFoundRoutes: AppRouterRecordRaw = {
  title: '未找到',
  path: '/:pathMath(.*)*/',
  redirect: '/404',
};

const InvalidLicense: AppRouterRecordRaw = {
  title: '无效的证书',
  path: CommonPath.InvalidLicense,
  name: 'InvalidLicense',
  meta: {
    isRequiredAuthentication: true,
    isWithoutRequiredLicense: true,
  },
  component: {},
};

export {
  ConstantRoutes,
  CommonWithHeaderRoutes,
  AdminRoutes,
  TesterRoutes,
  TestManagerRoutes,
  NotFoundRoutes,
  InvalidLicense,
  getRootRouter,
  KeyPath,
};
