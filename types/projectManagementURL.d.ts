type TProjectVersionsOverview = {
  version?: TOverviewVersion;
  overview?: TOverviewInfo;
  testResultOverview?: TTestResultOverview;
  functionCoverage?: TFunctionCoverage;
};

type TOverviewVersion = {
  _id?: string;
  coverages?: number;
  versionName?: string;
  projectId?: string;
};

type TOverviewInfo = {
  sourceFileCount?: number;
  headerFileCount?: number;
  numberOfLines?: TNumberOfLines;
  emptyLines?: TNumberOfLines;
  commentLines?: TNumberOfLines;
  testCount?: number;
  functionCount?: number;
  statementCovered?: number;
  statementTotal?: number;
  branchCovered?: number;
  branchTotal?: number;
  mcdcCovered?: number;
  mcdcTotal?: number;
  invokedFuncTotal?: number;
  invokedFuncCovered?: number;
  invokeTotal?: number;
  invokeCovered?: number;
  projectName?: string;
  projectId?: string;
  _id?: string;
  versionName?: string;
};

type TTestResultOverview = {
  manually?: TTObject<number>;
  automatically?: TTObject<number>;
};

type TFunctionCoverage = {
  statement?: TDistribution;
  branch?: TDistribution;
  mcdc?: TDistribution;
};

type TDistribution = {
  distribution?: number[];
};

type TNumberOfLines = {
  headerFile?: number;
  sourceFile?: number;
};

type TCaseStatistics = {
  /**
   * 通过
   */
  succeed: number;
  /**
   * 通过*
   */
  succeedWithExcept: number;
  /**
   * 未通过
   */
  failed: number;
  /**
   * 运行时错误
   */
  runtimeError: number;
  /**
   * 执行异常
   */
  executeException: number;
  /**
   * 无结果
   */
  noResult: number;
  /**
   * 未执行
   */
  notExecute: number;
};
