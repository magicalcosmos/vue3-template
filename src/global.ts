import { App } from 'vue';
import { Router } from 'vue-router';
import * as $filters from '@/filters';
import router, { $paths } from '@/router';
import { Log, Ajax, LocalStorage } from '@/utils';
import { LoadingStore, DynamicComponentStore } from '@/store';

declare module 'vue' {
  export interface ComponentCustomProperties {
    $filters: typeof $filters;
    $paths: typeof $paths;
    $log: typeof Log;
    $ajax: typeof Ajax;
    $localStorage: typeof LocalStorage;
    $router: Router;
    $loading: typeof LoadingStore;
    $dynamicComponent: typeof DynamicComponentStore;
  }
}

export default (app: App<Element>) => {
  Object.assign(app.config.globalProperties, {
    $filters,
    $paths,
    $log: Log,
    $ajax: Ajax,
    $localStorage: LocalStorage,
    $router: router,
    $loading: LoadingStore(),
    $dynamicComponent: DynamicComponentStore(),
  });
};
