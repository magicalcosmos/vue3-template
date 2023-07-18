import axios, { ResponseType, Method } from 'axios';
import { common, LocalStorage } from '@/utils';

import { IAjaxParams } from '@/interface';
import { LOGIN } from './dict';

import { ConfigStore, TConfigState } from '@/store';
import { ElMessage } from 'element-plus';
class Ajax {
  /**
   * 获取配置文件远程地址
   * @param address
   * @returns
   */
  getAddress(address: string): string {
    if (address.indexOf('return') !== -1) {
      return new Function(address)();
    }
    return address;
  }
  /**
   * 获取配置文件所有远程地址
   * @returns
   */
  getConfig(): Promise<TConfigState> {
    return new Promise((resolve, reject) => {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const store = ConfigStore();
      if (store.API_BASE && store.WS_ENDPOINT) {
        resolve({
          API_BASE: store.API_BASE,
          WS_ENDPOINT: store.WS_ENDPOINT,
        });
      } else {
        const URL = `${protocol}//${host}/config.json`;
        axios
          .get(URL)
          .then(data => {
            let newEnv: TConfigState = {
              API_BASE: '',
              WS_ENDPOINT: '',
            };
            const configData = data.data;
            if (configData.enable) {
              newEnv = {
                API_BASE: configData.API_BASE,
                WS_ENDPOINT: configData.WS_ENDPOINT,
              };
            } else {
              const { API_BASE, WS_ENDPOINT } = __RUN_ENV__ as TConfigState;

              if (API_BASE && WS_ENDPOINT) {
                newEnv = {
                  // for develop
                  API_BASE: this.getAddress(API_BASE),
                  WS_ENDPOINT: this.getAddress(WS_ENDPOINT),
                };
              }

              if (!newEnv.API_BASE) {
                // in case
                const lastHost = host.split(':')[0];
                newEnv = {
                  API_BASE: `${protocol}//${lastHost}:8006/api/v2`,
                  WS_ENDPOINT: `ws://${lastHost}:8006`,
                };
              }
            }
            store.setConfig(newEnv);
            resolve(newEnv);
          })
          .catch((err: Error) => {
            reject(err);
          });
      }
    });
  }

  /**
   * 通用请求
   * @param type
   * @param ajaxParams
   * @param isQueryString
   * @param isFormData
   */
  protected common(
    type: Method,
    ajaxParams: IAjaxParams<unknown>,
    isQueryString?: boolean,
    isFormData = false,
    responseType: ResponseType = 'json',
  ): Promise<any> {
    const that = this;
    return axios
      .all([LocalStorage.getTokenSync(), this.getConfig()])
      .then(
        axios.spread(function (AUTH_TOKEN, config) {
          if (AUTH_TOKEN) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
          }
          axios.defaults.responseType = responseType as ResponseType;
          (axios.defaults.headers as any)[type]['Content-Type'] = !isFormData
            ? 'application/x-www-form-urlencoded'
            : 'multipart/form-data';

          //================== interceptors request   ====================
          axios.interceptors.request.use(
            config => {
              //==========  all config before request  ==============
              return config;
            },
            err => {
              //==================  error handle  ====================
              return Promise.resolve(err);
            },
          );
          const { API_BASE } = config as TConfigState;
          let axiosURL = that.getAddress(API_BASE) + ajaxParams.url;
          let axiosParams = ajaxParams.params || {};
          if (isQueryString && Object.keys(ajaxParams.params as {}).length) {
            // put, delete请求参数放至URL后面
            axiosURL += (axiosURL.indexOf('?') < 0 ? '?' : '&') + common.safeURLEncode(ajaxParams.params as TObject);
            axiosParams = {};
          }

          const result = (axios as any)[type](axiosURL, axiosParams);
          result.catch((error: any) => {
            if (
              error &&
              error.response &&
              error.response.status === 401 &&
              ajaxParams.url.indexOf('access-token.json') < 0
            ) {
              LocalStorage.remove(LOGIN.TOKEN);
              window.location.reload();
            }
            if (error.message === 'Network Error') {
              ElMessage.error(`${error.message}: please check your network and make sure TestGrid server is stared!`);
            }
            (ajaxParams.callback as Function)(error);
            return error;
          });
          return !ajaxParams.callback
            ? result
            : result
                .then((data: Object) => {
                  (ajaxParams.callback as Function)('', data);
                })
        }),
      )
      .catch((err: Error) => {
        return ajaxParams.callback
          ? ajaxParams.callback(err)
          : new Promise((resolve, reject) => {
              reject(err);
            });
      });
  }
  get(ajaxParams: IAjaxParams<unknown>, isQueryString = true, responseType: ResponseType = 'json') {
    return this.common('get', ajaxParams, isQueryString, false, responseType);
  }

  post(ajaxParams: IAjaxParams<unknown>, isQueryString = false, responseType: ResponseType = 'json') {
    return this.common('post', ajaxParams, isQueryString, false, responseType);
  }

  put(ajaxParams: IAjaxParams<unknown>, isQueryString = true, responseType: ResponseType = 'json') {
    return this.common('put', ajaxParams, isQueryString, false, responseType);
  }

  delete(ajaxParams: IAjaxParams<unknown>, isQueryString = true, responseType: ResponseType = 'json') {
    return this.common('delete', ajaxParams, isQueryString, false, responseType);
  }

  /**
   * 用于提交文件
   * @param ajaxParams
   * @param isQueryString
   */
  formData(ajaxParams: IAjaxParams<unknown>, isQueryString = true, responseType: ResponseType = 'arraybuffer') {
    return this.common('post', ajaxParams, isQueryString, true, responseType);
  }

  download(ajaxParams: IAjaxParams<unknown>, isQueryString = true, responseType: ResponseType = 'arraybuffer') {
    return this.common('get', ajaxParams, isQueryString, false, responseType);
  }

  postDownload(ajaxParams: IAjaxParams<unknown>, isQueryString = false, responseType: ResponseType = 'arraybuffer') {
    return this.common('post', ajaxParams, isQueryString, false, responseType);
  }
}
export declare type AjaxInstance = InstanceType<typeof Ajax>;
export default new Ajax();
