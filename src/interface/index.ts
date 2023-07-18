/*
 * @Author: your name
 * @Date: 2020-05-27 17:51:03
 * @LastEditTime: 2020-08-10 15:18:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/interface/index.ts
 */
/** 用户信息 **/
export interface IUserInfo {
  userId?: string;
  username?: string;
  password?: string;
  roles?: unknown[];
  grantType?: string;
}
interface IValidate {
  required: boolean;
  trigger: string;
  validator: Function;
}
// 用户登录验证
export interface ILoginParamsValidate {
  username: Array<IValidate>;
  password: Array<IValidate>;
}

// 设置key value
export interface IKV {
  key: string;
  value: string;
}
// ajax请求参数
export interface IAjaxParams<T> {
  url: string; // 路径
  params: T; // 参数
  callback?: Function; // 回调
}
/**
 * 分页, 过滤
 */
export interface IFilter {
  page?: number;
  perPage?: number;
  order?: string;
  sortBy?: string;
  q?: string;
  total?: number;
  status?: boolean | number | Array<any>;
}
/**
 * 项目基本信息
 */
export interface IProjectBasicInfo {
  projectName: string;
  initVersion?: string;
  description?: string;
  id?: string;
  language?: string;
  projectType?: string;
}
/**
 * 文件树级联选择器
 */
export interface ISelectValue {
  versionId: string;
  selectValue: Array<any>;
}
/**
 * 函数节流配置参数
 * 两者不能同为false,否则就会产生bug,会导致触发事件立即执行一次后就失效了!
 */
export interface IThrottleOptions {
  /**
   * 是否立即执行
   */
  leading?: boolean;
  /**
   * 最后一次是否执行
   */
  trailing?: boolean;
}

export interface IRSelectOptions {
  /**
   * 选项的标签
   */
  label: string | number;
  /**
   * 选项的值
   */
  value: string | number | symbol | undefined;
  /**
   * 是否禁用该选项，可选
   */
  disabled?: boolean;
}
