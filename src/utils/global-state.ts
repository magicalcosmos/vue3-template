import { createGlobalState } from '@vueuse/core';
import { Dict } from '.';

/**
 * 全局状态，可根据需要自行扩展
 * @example
 *    import { useGlobalState } from '@/utils';
 *    const globalState = useGlobalState();
 *    console.log(unref(globalState.isUnitTest));
 *
 *    const { isUnitTest, currentTestType } = useGlobalState();
 *    console.log(unref(isUnitTest));
 */
export const useGlobalState = createGlobalState(() => {
  const route = useRoute();

  /**
   * 判断是否为单元测试主页
   * @return boolean
   */
  const isUnitTest = computed(() => {
    return route.name === 'UnitTesting';
  });
  /**
   * 判断是否为集成测试主页
   * @return boolean
   */
  const isIntegrationTest = computed(() => {
    return route.name === 'IntegratedTesting';
  });

  /**
   * 判断是否为静态分析主页
   * @return boolean
   */
  const isStaticAnalysis = computed(() => {
    return route.name === 'AnalysisHome';
  });

  /**
   * 获取当前测试类型
   * @update 2021-10-8 16:32:05
   */
  const currentTestType = computed(() => {
    let moduleType = '';
    if (unref(isStaticAnalysis)) {
      moduleType = Dict.VERSION_TYPE.STATIC_ANALYSIS;
    } else if (unref(isUnitTest)) {
      moduleType = Dict.VERSION_TYPE.UNIT_TEST;
    } else if (unref(isIntegrationTest)) {
      moduleType = Dict.VERSION_TYPE.INTEGRATION_TEST;
    }
    return moduleType;
  });

  return { isUnitTest, isIntegrationTest, isStaticAnalysis, currentTestType };
});
