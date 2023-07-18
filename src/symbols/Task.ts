/*
 * @Author: zhangpeng
 * @Date: 2023-04-11 10:47:57
 * @LastEditors: zhangpeng
 * @LastEditTime: 2023-04-11 10:49:14
 * @FilePath: /Leopard/src/symbols/Task.ts
 * @Description:
 */
import { InjectionKey } from 'vue';

/** 任务类型 */
export const TaskTypeKey: InjectionKey<string> = Symbol('TaskTypeKey');
