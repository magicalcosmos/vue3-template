declare type TBase = string | number | boolean | null | undefined;
declare type TAdvanced = TBase | never | symbol | any;
// declare module 'Log' {
//   import Log from '@/utils/Log';
//   export declare type LogInstance = InstanceType<typeof Log>;
//   export default new Log();
// }

// declare module 'Ajax' {
//   import Ajax from '@/utils/Ajax';
//   export declare type AjaxInstance = InstanceType<typeof Ajax>;
//   export default new Ajax();
// }

declare module '$t' {
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  export default t;
}

declare module 'Sha256' {
  import Sha256 from '@/utils/sha256';
  export declare type Sha256Instance = InstanceType<typeof Sha256>;
  export default Sha256;
}
// declare module 'LocalStorage' {
//   import LocalStorage from '@/utils/LocalStorage';
//   export declare type LocalStorageInstance = InstanceType<typeof LocalStorage>;
//   export default new LocalStorage();
// }

type C<T> = {
  id?: string | number | float;
  value: T;
  data?: any;
};

/** { label: ''; value: T} 通用类型 */
declare type TLV<T> = C & {
  label?: string | number | float | T;
};

/** { label: ''; value: T} 通用类型 */
declare type TNV<T> = C & {
  name?: string | number | float | T;
};

declare type TKV = {
  key: string | number | float;
  value: string;
};

declare type TTV = {
  text: string | number | float;
  value: string | number | float;
};

declare type TKV<T, E> = {
  key: string | number | float | T;
  value: string | number | float | E;
};

/**
 * 分页, 过滤
 */
declare type TPaginationFilter = {
  /**
   * 页码
   */
  page?: number;
  /**
   * 每页记录数
   */
  perPage?: number;
  /**
   * 排序顺序 asc-升序, desc-降序
   */
  order?: string;
  /**
   * 排序字段
   */
  sortBy?: string;
  /**
   * 过滤字段
   */
  q?: string;
  /**
   * 总记录数
   */
  total?: number;
  /**
   * @TODO 补充字段说明
   */
  status?: boolean | number | Array<any>;
};


