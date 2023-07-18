import { defineStore } from 'pinia';
import { NS } from './store-name';

export type TFunctionState = {
  funcConstructorStatus: boolean;
};
export const FunctionStore = defineStore(NS.FUNCTION, {
  state: () => {
    return {
      funcConstructorStatus: false,
    } as TFunctionState;
  },
  getters: {},
  actions: {
    setFunction(func: TFunctionState) {
      this.funcConstructorStatus = func.funcConstructorStatus;
    },
  },
});
