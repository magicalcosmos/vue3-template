import { defineStore } from 'pinia';
import { NS } from './store-name';
export type TConfigState = {
  /** API 地址*/
  API_BASE: string;
  /** Websocket 地址*/
  WS_ENDPOINT: string;
};
export const ConfigStore = defineStore(NS.CONFIG, {
  state: () => {
    return {
      API_BASE: '',
      WS_ENDPOINT: '',
    } as TConfigState;
  },
  getters: {},
  actions: {
    setConfig(config: TConfigState): void {
      this.API_BASE = config.API_BASE;
      this.WS_ENDPOINT = config.WS_ENDPOINT;
    },
  },
});
