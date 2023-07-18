/* eslint-disable */
import { ComponentCustomProperties } from 'vue';
import type { TFilter } from '@/filters';
import type { LogInstance } from '@utils/Log';

declare module '*.vue' {
  import { FunctionalComponent, defineComponent } from 'vue';
  //const Component: DefineComponent<{}, {}, any>;
  const Component: ReturnType<typeof defineComponent> | FunctionalComponent;
  export default Component;
}
// this.$store强类型支持
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: TFilter;
    $log: LogInstance;
    $router: Router;
  }
}
