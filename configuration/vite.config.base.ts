//**********************************
//******** Vite base config ********
//**********************************

import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import dynamicImport from 'vite-plugin-dynamic-import';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from 'vite';
import { resolve } from 'path';

let RUN_ENV = {};

if (process.env.RUN_ENV) {
  RUN_ENV = require(resolve(__dirname, `./env/${process.env.RUN_ENV}.env.js`));
}
/**
 * concat path
 * @param dir directory
 */
export function Resolve(dir) {
  return resolve(__dirname, '..', dir);
}
const configBase = defineConfig({
  define: {
    __RUN_ENV__: RUN_ENV,
    /** remove vue-i18n warning */
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true,
      },
      scss: {
        charset: false,
        additionalData: `
          @import "./src/theme/default/variables.scss";
          @import "./src/styles/variables.scss";
          @import "./src/styles/function.scss";
        `,
      },
    },
    modules: {
      localsConvention: 'dashes',
    },
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: atRule => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  resolve: {
    alias: {
      '@': Resolve('src'),
      '@gc': Resolve('src/components'), // global components
      '@vc': Resolve('src/views/components'), // views components
      '@ac': Resolve('src/asyncComponent'), // async components
      '@static': Resolve('static'), // static
      '@img': Resolve('static/img'), // static/img
      '@t': Resolve('types'), // static/img
      '@libs': Resolve('src/libs'),
    },
  },
  plugins: [
    vue(),
    vueJSX(),
    dynamicImport(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'vue-i18n'], // 自动导入vue和vue-router相关函数
      dts: 'src/auto-imports.d.ts', // 生成 `auto-import.d.ts` 全局声明
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    cssCodeSplit: true,
    commonjsOptions: {
      esmExternals: true,
    },
    // 静态资源打包到dist下的不同目录
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  //envDir: './env'  // custom envirment, but I don't want to use
});
export default configBase;
