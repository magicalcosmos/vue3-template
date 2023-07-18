import { AppRouterRecordRaw } from '.';
import { CommonPath } from './paths';
// import { RouteRecordRaw } from 'vue-router';
const commonRouter: Array<AppRouterRecordRaw> = [
  {
    title: '登录',
    path: CommonPath.Login,
    name: 'Login',
    hidden: true,
    meta: {
      isRequiredAuthentication: false,
    },
    component: {},
  },
  {
    title: '版本信息',
    path: CommonPath.About,
    name: 'About',
    hidden: true,
    meta: {
      isRequiredAuthentication: true,
    },
    component: {},
  },
  {
    title: '无法找到页面',
    path: CommonPath.NotFound,
    name: 'NotFound',
    hidden: true,
    meta: {
      isRequiredAuthentication: false,
    },
    component: {},
  },
  {
    title: '测试组件页面',
    path: CommonPath.TestComponents,
    name: 'TestComponents',
    hidden: true,
    meta: {
      isRequiredAuthentication: false,
    },
    component: {},
  },
  {
    title: '修改密码',
    path: CommonPath.ChangePassword,
    name: 'ChangePassword',
    meta: {
      isRequiredAuthentication: true,
    },
    component: {},
  },
  {
    title: '跳转页面（postmessage）',
    path: CommonPath.Redirect,
    name: 'Redirect',
    hidden: true,
    meta: {
      isRequiredAuthentication: true,
    },
    component: {},
  },
  {
    title: '常见问题',
    path: CommonPath.FAQ,
    name: 'FAQ',
    hidden: true,
    meta: {
      isRequiredAuthentication: false,
    },
    component: {},
  },
  {
    title: '用户手册',
    path: CommonPath.Manual,
    name: 'Manual',
    hidden: true,
    meta: {
      isRequiredAuthentication: false,
    },
    component: {},
  },
];
export default commonRouter;
