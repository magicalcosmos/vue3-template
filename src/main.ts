import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';

import '@static/vendor/fonts/icon.scss';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import i18n, { locale } from '@/i18n';

import App from '@/App.vue';

import '@static/fonts/iconfont.css';
import '@static/fonts/iconfont.js';

import '@/theme/default/index.scss'; // global css
import './setGlobalTitle';
import './permission';

import '@/utils/jsextend';

import Global from './global';

import directives from '@/directives';

import RocketUI from '@gc/rocket-ui';

import VueDOMPurifyHTML from 'vue-dompurify-html';

const app = createApp(App);

// Global components defined
RocketUI(app);

// store
app.use(createPinia());

// Global variable defined
Global(app);

directives(app);

app.use(ElementPlus, {
  locale,
});

// for v-dompurify-html XSS
app.use(VueDOMPurifyHTML);

// i18n
app.use(i18n);

app.use(router);

app.mount('#app');
