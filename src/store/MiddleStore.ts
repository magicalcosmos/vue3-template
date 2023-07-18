import { defineStore } from 'pinia';
import { NS } from './store-name';

export type TMiddleState = {
  /** 测试用例详情 - 文件树节点点击转发  */
  nodeClickEventNum: number;

  /** 测试用例列表 - 测试用例  */
  testCaseClickEventNum: number;
};

/** 中间转发，主要用于事件转发, 类似于event bus的功能 */
export const MiddleStore = defineStore(NS.MIDDLE, {
  state: () => {
    return {
      /** 测试用例详情 - 文件树节点点击转发  */
      nodeClickEventNum: 0,

      /** 测试用例列表 - 测试用例点击转发   */
      testCaseClickEventNum: 0,
    } as TMiddleState;
  },
  getters: {},
  actions: {
    setMiddle(middle: TMiddleState) {
      for (const key in middle) {
        this[key] = middle[key];
      }
    },
  },
});
