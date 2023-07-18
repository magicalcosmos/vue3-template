import axios from 'axios';
import utils from './utils';
// import { Token } from '@/utils/auth'
import router from '../router';
// import { Message } from 'element-ui';
import store from '../store';
import { updateCookie } from './auth';

// create an axios instance
const service = axios.create({
  withCredentials: true
});
// request interceptor
service.interceptors.request.use(config => {
  config.baseURL = utils.getAPIAddress();
  return config;
}, error => {
  Promise.reject(error);
});
service.interceptors.response.use(res => {
  try {
    if (res.config.url.split(res.config.baseURL)[1] !== '/feeds/unread' &&
      res.config.url.split(res.config.baseURL)[1] !== '/submission/unresolvedCount' && res.config.url.split(res.config.baseURL)[1].indexOf('/shared-report') === -1 && res.config.url.split(res.config.baseURL)[1].indexOf('/main') === -1) {
      store.dispatch('GetFeedsCount').then(res => {
        // console.log('刷新消息成功')
      });
      store.dispatch('GetAuditCount').then(res => {
        // console.log('刷新消息成功')
      });
      if (res.request.status === 200) {
        updateCookie();
      }

    }
  } catch (e) {
    return res;
  }
  return res;
}, err => {
  if (err.message === 'Network Error') {
    // Message.error('连接中断，请检查网络');
  }
  if (err === undefined || err.response === undefined || err.response.status === 401) {
    // alert("跳转页面")
    router.push('/login');
    // router.dispatch("login")
  }
  //
  return Promise.reject(err);
});

// // respone interceptor
// service.interceptors.response.use(
//   response => response,
//   /**
//    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
//    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
//    */
//     //  const res = response.data;
//     //     if (res.code !== 20000) {
//     //       Message({
//     //         message: res.message,
//     //         type: 'error',
//     //         duration: 5 * 1000
//     //       });
//     //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//     //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//     //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//     //           confirmButtonText: '重新登录',
//     //           cancelButtonText: '取消',
//     //           type: 'warning'
//     //         }).then(() => {
//     //           store.dispatch('FedLogOut').then(() => {
//     //             location.reload();// 为了重新实例化vue-router对象 避免bug
//     //           });
//     //         })
//     //       }
//     //       return Promise.reject('error');
//     //     } else {
//     //       return response.data;
//     //     }
//   error => {
//     console.log('err' + error)// for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   })

export default service;
