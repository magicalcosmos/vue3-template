import localStorage from '@/utils/LocalStorage';
import Log from '@/utils/Log';
import ajax from '@/utils/Ajax';
import { WebsocketStore, TConfigState } from '@/store';
import { CMD } from './dict';

export type TWSParams = {
  /** Websocket连接地址 */
  url: string | null;
  /** 关闭事件回调 */
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
  /** 错误事件回调*/
  onerror: ((this: WebSocket, ev: Event) => any) | null;
  /** 消息事件回调 */
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
  /** 打开Websocket事件回调 */
  onopen: ((this: WebSocket, ev: Event) => any) | null;
  /** 回调 */
  callback: (data: WebSocket) => {} | null;
};

/**
 * Websocket工具库
 * 实现了Websocket的连接，重接，订阅，取消订阅
 * 支持方法如下：
 *    start, stop, subscribe, unsubscribe
 */
class RWebSocket {
  /** Save all subscribed channel for subscribing channel after ws closed again */
  private channelStore: TObject = {};

  /** Is connect again */
  private isReconnect = true;

  constructor() {}

  /**
   * Connect to API
   * @param params
   */
  connect(params?: TWSParams): any {
    Promise.all([localStorage.getTokenSync(), ajax.getConfig()]).then((result: Array<unknown>) => {
      const token = result[0] as string;
      const config = result[1] as TConfigState;
      if (token && config) {
        const WSURL = ajax.getAddress(config.WS_ENDPOINT);
        const ws = new WebSocket(`${(params && params.url) || WSURL}?accessToken=${token}`);
        this.initWebSocketMethods(ws, params);
      }
    });
  }

  /**
   * Initialize websocket method
   * @param ws
   * @param params
   */
  initWebSocketMethods(ws: WebSocket, params?: TWSParams) {
    const store = WebsocketStore();
    ws.onopen =
      (params && params.onopen) ||
      (() => {
        Log.log('Websocket connection open...'); // eslint-disable-line
        // subscribe channel again
        for (const channel in this.channelStore) {
          channel && this.subscribe(channel);
        }
      });

    ws.onmessage =
      (params && params.onmessage) ||
      ((result: any) => {
        const data = JSON.parse(result.data);
        // print message info
        Log.log(JSON.stringify(data, null, 2));
        store.setWebSocket({
          websocketMessage: data,
        });
        params && params.callback && params.callback(data);
      });

    ws.onclose = (data: any) => {
      Log.log('Websocket connection closed'); // eslint-disable-line
      store.setWebSocket({
        websocketMessage: data,
      });
      if (data.code !== CMD.CLOSE) {
        this.isReconnect && this.connect(params);
      }
    };

    store.setWebSocket({
      ws: ws,
    });
  }

  /**
   * Stop websocket listening
   */
  stop() {
    const store = WebsocketStore();
    this.isReconnect = false;
    store.setWebSocket({
      ws: null,
    });
  }

  /**
   * Start listen websocket by api
   */
  start() {
    this.isReconnect = true;
    this.channelStore = {};
    this.connect();
  }

  /**
   * Common send for subscribe and unsubscribe
   * @param cmd
   * @param channel
   */
  commonSend(cmd: string, channel: string) {
    const store = WebsocketStore();
    store.ws?.send(
      JSON.stringify({
        cmd: cmd,
        data: {
          channel: channel,
          accessToken: localStorage.getToken(),
        },
      }),
    );
  }

  /**
   * Subscribe channel
   * @param channel
   */
  subscribe(channel: string) {
    // 订阅频道
    this.channelStore[channel] = channel;
    this.commonSend('subscribe', channel);
  }

  /**
   * Cancel subscribe channel
   * @param channel
   */
  unsubscribe(channel: string) {
    this.channelStore[channel] && delete this.channelStore[channel];
    this.commonSend('unsubscribe', channel);
  }
}
export default new RWebSocket();
