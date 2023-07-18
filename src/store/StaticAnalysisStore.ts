import { defineStore } from 'pinia';
import { NS } from './store-name';

export type TStaticAnalysisState = {
  levelFilter: number;
  tabName: string;
  filterFilesParams: TDefectFilterParam;
  selectedFile: TFileTree;
  filterRulesParams: TDefectFilterParam;
  selectedRule: TFileTree;
  rulesMap: TObject;
};
export const StaticAnalysisStore = defineStore(NS.FUNCTION, {
  state: () => {
    return {
      levelFilter: -1, // 文件树缺陷类型筛选
      tabName: 'files', // 文件树tab
      filterFilesParams: {}, // 按文件分类缺陷列表请求参数
      selectedFile: {}, // 按文件分类选中文件
      filterRulesParams: {}, // 按规范分类缺陷列表请求参数
      selectedRule: {}, // 按规范分类选中文件
      rulesMap: {}, // 规范数据
    } as TStaticAnalysisState;
  },
  getters: {},
  actions: {
    setLevelFilter(levelFilter: number) {
      this.levelFilter = levelFilter;
    },
    setTabName(tabName: string) {
      this.tabName = tabName;
    },
    setFilterFilesParams(filterFilesParams: TDefectFilterParam) {
      this.filterFilesParams = filterFilesParams;
    },
    setSelectedFile(selectedFile: TFileTree) {
      this.selectedFile = selectedFile;
    },
    setFilterRulesParams(filterRulesParams: TDefectFilterParam) {
      this.filterRulesParams = filterRulesParams;
    },
    setSelectedRule(selectedRule: TFileTree) {
      this.selectedRule = selectedRule;
    },
    setRulesMap(ruleData: TObject) {
      this.rulesMap = ruleData;
    },
  },
});
