//**********************************
//******** Vite local config *******
//**********************************
import { type UserConfigExport } from 'vite';
import { merge } from 'webpack-merge';
import configBase from './vite.config.base';
const devConfig: UserConfigExport = merge(configBase, {
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    cors: true,
    open: true,
  },
});
export default devConfig;
