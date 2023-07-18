declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;

  export default component;
}

declare type Nullable<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T;

declare type Indexable<T> = {
  [key: string]: T;
};

declare type TObject = {
  [key: string]: TBase | any;
};

declare type TMObject = {
  [key: string]: TBase | any;
}[];

declare type TTObject<T> = {
  [key: string]: T | any;
};

declare type TTMObject<T> = {
  [key: string]: T | any;
}[];

declare type _ScrollPositionNormalized = {
  behavior?: ScrollOptions['behavior'];
  left: number;
  top: number;
};

// import { AxiosRequestConfig } from 'axios';

// declare module 'axios' {
//   export interface AxiosInstance {
//     <T = any>(config: AxiosRequestConfig): Promise<T>;
//     request<T = any>(config: AxiosRequestConfig): Promise<T>;
//     get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//     put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//     patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//   }
// }
