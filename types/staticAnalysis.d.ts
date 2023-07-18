type TDefectsCount = {
  /**
   * 缺陷数量-强制
   */
  mandatory?: number;
  /**
   * 缺陷数量-要求
   */
  required?: number;
  /**
   * 缺陷数量-建议
   */
  advisory?: number;
};

type TVersions = {
  /**
   * 用户id
   */
  userId?: string;
  /**
   * 用户名
   */
  userName?: string;
  /**
   * 版本ID
   */
  versionId?: string;
  /**
   * 版本名称
   */
  versionName?: string;
  /**
   * 项目ID
   */
  projectId?: string;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 静态分析次数
   */
  times?: number;
  /**
   * 缺陷数量
   */
  defectsCount?: TDefectsCount;
  /**
   * 静态分析执行时间戳
   */
  executedAt?: number;
};

/**
 * 测试经理下所有测试人员的所有版本列表。
 */
type TStaticAnalyzeVersions = {
  /**
   * 分页信息
   */
  pagination?: TPaginationFilter;
  /**
   * 版本信息列表
   */
  versions?: TVersions[];
};

// 某个检测标准下的规则等级数组
type TLevels = {
  /**
   * 规则等级
   */
  level?: number;
  /**
   * 某个等级下的缺陷总数
   */
  total?: number;
  /**
   * 某个等级下的缺陷密度(per kloc)
   */
  kloc?: number;
};
// 缺陷等级下的规则数组
type TFiles = {
  /**
   * 文件对应的缺陷总数
   */
  total?: number;
  /**
   * 文件id
   */
  fileId?: string;
  /**
   * 文件路径
   */
  filePath?: string;
  /**
   * 文件名
   */
  fileName?: string;
};
// 缺陷等级下的规则数组
type TRules = {
  /**
   * 规则对应的缺陷总数
   */
  total?: number;
  /**
   * 规则id
   */
  ruleId?: string;
  /**
   * 规则名
   */
  name?: string;
};
// 测试人员获取当前项目版本下的项目版本静态检测总览。
type TStaticAnalyzeOverview = {
  /**
   * 某个检测标准下的规则等级数组
   */
  levels?: TLevels[];
  /**
   * 缺陷等级下的规则数组
   */
  files?: TFiles[];
  /**
   * 缺陷等级下的规则数组
   */
  rules?: TRules[];
};

// 测试经理所有项目名称
type TProjectsNamesSet = {
  /**
   * 项目名列表
   */
  names?: string[];
};

// 静态分析缺陷列表
type TRuleItem = {
  level?: number;
  originalLevel?: number;
  orderIndex?: number;
  ruleCode?: string;
  ruleId?: string;
  ruleName?: string;
  ruleSetName?: string;
  total?: number;
  path?: string;
};

// 缺陷列表请求参数
type TDefectFilterParam = {
  ruleId?: string;
  fileId?: string;
  status?: number[];
};

// 缺陷列表
type TDefectList = {
  defectId?: string;
  fileId?: string;
  fileName?: string;
  filePath?: string;
  line?: number;
  message?: string;
  number?: number;
  projectId?: string;
  ruleCode?: string;
  ruleId?: string;
  ruleLevel?: number;
  ruleName?: string;
  ruleOrderIndex?: number;
  ruleSetId?: string;
  ruleSetName?: string;
  statisticsLevel?: number;
  status?: number;
  steps?: TDefectItemSteps[];
  versionId?: string;
  [key: string]: any;
};

// 缺陷列表中的steps
type TDefectItemSteps = {
  filePath?: string;
  line?: number;
};

// 测试经理所有版本名称
type TVersionNamesSet = {} & TProjectsNamesSet;

// 检测模板列表
type TDefectTemplateList = {
  description: string;
  languages: Array<string>;
  name: string;
  templateId: string;
  isDefault?: boolean;
};

// 接口返回的自定义缺陷类型
type TUserDefined = {
  [key: string]: {
    level: number;
  };
};

// 传给接口的自定义缺陷类型
type TUserDefinedParam = {
  ruleId: string;
  level: number;
};

// 检测模板导出数据
type TDefectTemplateConfig = {
  templateId?: string;
  userDefined?: TUserDefined;
  ruleMap?: TObject;
} & TDefectTemplateList;

// 总览某个检测标准下的规则等级数组
type TStaticAnalysisOverviewLevel = {
  level: number; // 规则等级
  kloc: number; // 某个等级下的缺陷密度
  total: number; // 某个等级下的缺陷总数
};

// 总览缺陷等级下的规则数组
type TStaticAnalysisOverviewRule = {
  name: string;
  ruleCode: string;
  ruleId: string;
  ruleSet: string;
  total: number;
};

// 总览数据
type TStaticAnalysisOverview = {
  files?: TFiles[];
  levels?: TStaticAnalysisOverviewLevel[];
  rules?: TStaticAnalysisOverviewRule[];
  projectId?: string;
  projectName?: string;
  numberOfFiles?: number; // 文件数量
  numberOfLines?: number; // 代码行数
  versionId?: string;
  versionName?: string;
};
