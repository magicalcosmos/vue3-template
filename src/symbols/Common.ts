import { ComputedRef, InjectionKey } from 'vue';

/** 版本信息 */
export const VersionKey: InjectionKey<ComputedRef<TVersion>> = Symbol('Version');

/** 项目信息 */
export const ProjectKey: InjectionKey<ComputedRef<TProject>> = Symbol('Project');

/** 获取主版本id */
export const GetMasterVersionId: InjectionKey<Function> = Symbol('GetMasterVersion');

/** 重新加载版本信息 */
export const ReloadVersionKey: InjectionKey<Function> = Symbol('ReloadVersion');
