// import axios from 'axios';
// import router from '../router';
// import { Message } from 'element-ui';
// import Log from '@/utils/log';

// class Request {
//   service: any;
//   constructor() {
//     this.initAxios();
//     return this.service;
//   }

//   initAxios() {
//     // create an axios instance
//     this.service = axios.create({
//       withCredentials: true
//     });
//     const interceptors = this.service.interceptors;
//     // request interceptor
//     interceptors.request.use((config) => {
//       return config;
//     }, (error) => {
//       Log.log(error); // for debug
//       Promise.reject(error);
//     });
//     interceptors.response.use((res) => {
//       return res;
//     }, (err) => {
//       if (err.message === 'Network Error') {
//         Log.log('网络错误');
//         Message.error('连接中断，请检查网络');
//       }
//       if (err === undefined || err.response === undefined || err.response.status === 401) {
//         router.push('/login');
//       }
//       return Promise.reject(err);
//     });
//   }
// }

// export default new Request();
