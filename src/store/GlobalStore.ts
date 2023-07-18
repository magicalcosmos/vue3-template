import { defineStore } from 'pinia';
import { NS } from './store-name';
export type TGlobalState = {
  /** 滚动延迟时间  */
  SCROLL_DELAY_TIME: number;
};
export const GlobalStore = defineStore(NS.GLOBAL, {
  state: () => {
    return {
      SCROLL_DELAY_TIME: 150,
    } as TGlobalState;
  },
  getters: {},
  actions: {},
});
