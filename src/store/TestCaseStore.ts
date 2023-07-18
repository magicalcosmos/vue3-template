import { defineStore } from 'pinia';
import { NS } from './store-name';

export type TTestCaseState = {
  fileTreeNodeSelected?: any;
  /** all test cases data for single function */
  testCaseList?: Array<any>;

  isNodeClick?: boolean;

  mallocData?: Array<any>;

  stubsData?: Array<any>;

  absoluteAddressData?: Array<any>;

  absoluteAddressExpData?: Array<any>;

  /** 复制测试用例数据，主要用于监听添加测试用例，添加分组，复制测试用例 */
  copyTestCaseData?: TTestCase;

  deleteTestCaseData?: string;

  cfgTestCaseSelected?: any;

  functionInvokeData?: Array<any>;

  /** 折叠记忆 */
  foldMemory?: any;

  /** 用例搜索关键字 */
  searchKeyword?: any;

  /** 搜索折叠记忆 */
  searchFoldMemory?: any;

  /** 用例显示配置 */
  testCaseFieldConfig?: any;

  /** 选中的需要删除的用例 */
  testCaseForDelete?: Array<any>;

  /** 源代码, 用于添加绝对地址 */
  sourceCode?: string;

  /** 指针目标下拉选择数据 */
  pointTargetOptionsMap?: TObject;

  /** 指针目标二级下拉选择数据 */
  pointTargetSecondOptionsMap?: Array<TCascaderOptionItem>;
};

export const TestCaseStore = defineStore(NS.TESTCASE, {
  state: () => {
    return {
      fileTreeNodeSelected: {},

      testCaseList: [],

      isNodeClick: false,

      mallocData: [],

      stubsData: [],

      absoluteAddressData: [],

      absoluteAddressExpData: [],

      /** 复制测试用例数据，主要用于监听添加测试用例，添加分组，复制测试用例 */
      copyTestCaseData: {},

      deleteTestCaseData: '',

      cfgTestCaseSelected: {},

      functionInvokeData: [],

      /** 折叠记忆 */
      foldMemory: {},

      /** 用例搜索关键字 */
      searchKeyword: {},

      /** 搜索折叠记忆 */
      searchFoldMemory: {},

      /** 用例显示配置 */
      testCaseFieldConfig: {},

      /** 选中的需要删除的用例 */
      testCaseForDelete: [],

      /** 源代码 */
      sourceCode: '',

      /** 指针目标选项 */
      pointTargetOptionsMap: {},

      /** 指针目标二级选项 */
      pointTargetSecondOptionsMap: [],
    } as TTestCaseState;
  },
  getters: {},
  actions: {
    setTestCase(testCase: TTestCaseState) {
      for (const key in testCase) {
        this[key] = testCase[key];
      }
    },

    selectFileTreeNodes(fileTreeNodeSelected: any) {
      this.fileTreeNodeSelected = fileTreeNodeSelected;
    },

    saveTestCaseData(testCaseData: Array<any>) {
      this.testCaseList = testCaseData;
    },

    saveIsNodeClick(status: boolean) {
      this.isNodeClick = status;
    },

    setMallocData(mallocData: Array<any>) {
      this.mallocData = mallocData;
    },

    setStubsData(stubsData: Array<any>) {
      this.stubsData = stubsData;
    },

    setAbsoluteAddressData(absoluteAddressData: Array<any>) {
      this.absoluteAddressData = absoluteAddressData;
    },

    setSelectedAbsoluteAddressExpData(absoluteAddressExpData: Array<any>) {
      this.absoluteAddressExpData = absoluteAddressExpData;
    },

    setCFGTestCaseSelected(cfgTestCaseSelected: Array<any>) {
      this.cfgTestCaseSelected = cfgTestCaseSelected;
    },

    /**
     * 复制测试用例
     * @param testCaseData 测试用例数据
     */
    copyTestCase(testCaseData: any) {
      this.copyTestCaseData = testCaseData;
    },

    deleteTestCase(deleteTestCaseData: string) {
      this.deleteTestCaseData = deleteTestCaseData;
    },

    setFunctionInvokeData(data: Array<any>) {
      this.functionInvokeData = data;
    },

    setFoldMemory(data: any) {
      if (data && data.key) {
        this.foldMemory[data.key] = data.value;
      } else {
        this.foldMemory = {};
      }
    },

    setSearchKeyWord(data: any) {
      if (data && data.key) {
        this.searchKeyword[data.key] = data.value;
      } else {
        this.searchKeyword = {};
      }
    },

    setSearchFoldMemory(data: any) {
      if (data && data.key) {
        this.searchFoldMemory[data.key] = data.value;
      } else {
        this.searchFoldMemory = {};
      }
    },

    setTestCaseFieldConfig(data: any) {
      this.testCaseFieldConfig = data;
    },

    setTestCaseForDelete(data: any) {
      this.testCaseForDelete = data;
    },

    setSourceCode(content: string) {
      this.sourceCode = content;
    },

    setPointTargetOptions(data: TObject) {
      this.pointTargetOptionsMap = data;
    },

    setPointTargetSecondOptions(data: Array<any>) {
      this.pointTargetSecondOptionsMap = data;
    },
  },
});
