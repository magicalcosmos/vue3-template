import { defineStore } from 'pinia';
import { NS } from './store-name';

export type TWebsocketState = {
  ws?: WebSocket | null;
  websocketMessage?: TObject | null;
};
export const WebsocketStore = defineStore(NS.WEBSOCKET, {
  state: () => {
    return {
      ws: {},
      websocketMessage: {},
    } as TWebsocketState;
  },
  getters: {},
  actions: {
    setWebSocket(websocket: TWebsocketState) {
      if (websocket.ws) {
        this.ws = websocket.ws;
      }
      if (websocket.websocketMessage) {
        this.websocketMessage = websocket.websocketMessage;
      }
    },
  },
});
