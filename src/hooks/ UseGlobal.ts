import { getCurrentInstance } from 'vue';
/**
 * 获取全局变量
 */
export default function useGetGlobalProperties() {
  const {
    emit,
    appContext: {
      app: {
        config: { globalProperties },
      },
    },
  } = getCurrentInstance();
  return { ...globalProperties };
}
