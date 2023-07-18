import { defineStore } from 'pinia';
import { NS } from './store-name';

export type TProgressState = {
  percentage?: string;
  visible?: boolean;
  message?: string;
};

export const ProgressStore = defineStore(NS.PROGRESS, {
  state: () => {
    return {
      percentage: '0%',
      visible: false,
      message: '',
    } as TProgressState;
  },
  getters: {},
  actions: {
    setFloatingBall(progress: TProgressState) {
      for (const key in progress) {
        this[key] = progress[key];
      }
    },
  },
});
