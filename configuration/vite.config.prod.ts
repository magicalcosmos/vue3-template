//**********************************
//******** Vite local config *******
//**********************************
import copy from 'rollup-plugin-copy';
import { merge } from 'webpack-merge';
import legacy from '@vitejs/plugin-legacy';

import configBase, { Resolve } from './vite.config.base';
const devConfig = merge(configBase, {
  mode: 'production',
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
    outDir: 'dist',
    assetsDir: 'static',
  },
  plugins: [
    copy({
      targets: [
        {
          src: Resolve('src/pwa/*'),
          dest: Resolve('dist/'),
        },
        {
          src: Resolve('configuration/env/config.json'),
          dest: Resolve('dist/'),
        },
      ],
      hook: 'writeBundle',
      copyOnce: true,
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
});
export default devConfig;
