import { defineStore } from 'pinia';
import { NS } from './store-name';

export type TTreeState = {
  construct: Array<string>;
};
export const TreeStore = defineStore(NS.FUNCTION, {
  state: () => {
    return {
      construct: [],
    } as TTreeState;
  },
  getters: {},
  actions: {
    setTree(tree: TTreeState) {
      this.construct = tree.construct;
    },
  },
});
