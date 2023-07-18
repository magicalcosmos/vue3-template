import { defineStore } from 'pinia';
import { NS } from './store-name';
export type TDynamicComponentState = {
  /**
   * 动态组件是否显示
   */
  dynamicVisible: boolean;
  /**
   * 动态组件
   */
  dynamicComponent?: TObject;
  /**
   * 组件的props
   */
  dynamicProps?: TObject;
  /**
   * 自定义动态数据传递
   */
  dynamicCustomData?: TObject;
  /**
   * 保存事件
   */
  dynamicSave?: (data: any, callback?: Function | any) => void | any;
  /**
   * 取消事件
   */
  dynamicCancel?: () => void;
};

export const DynamicComponentStore = defineStore(NS.DYNAMIC_COMPONENT, {
  state: () => {
    return {
      dynamicVisible: false,
      dynamicComponent: undefined,
      dynamicProps: {},
      dynamicCustomData: {},
      dynamicSave: () => {},
      dynamicCancel: () => {},
    } as TDynamicComponentState;
  },
  getters: {},
  actions: {
    setDynamicComponent(params: TDynamicComponentState) {
      for (const key in params) {
        this[key] = params[key];
      }
    },
  },
});
