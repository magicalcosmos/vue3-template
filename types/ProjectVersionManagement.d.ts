type TFilesOverview = {
  version?: TOverviewVersion;
  files?: TFilesOverviewList[];
  countOverview?: TCountOverview[];
  pagination?: TPaginationFilter;
};

type TFunctionOverview = {
  version?: TOverviewVersion;
  functions?: TFunctionOverviewList[];
  pagination?: TPaginationFilter;
};

type TTestsOverview = {
  version?: TOverviewVersion;
  countOverview?: number;
  tests?: TTestsOverviewList[];
  pagination?: TPaginationFilter;
};

type TCountOverview = {
  status?: number;
  count?: number;
};

type TFilesOverviewList = {
  _id?: string;
  fileName?: string;
  path?: string;
  status?: number;
  numberOfLines?: number;
  branchCovered?: number;
  branchTotal?: number;
  mcdcCovered?: number;
  mcdcTotal?: number;
  statementCovered?: number;
  statementTotal?: number;
  testCount?: number;
  functionCount?: number;
  invokedFuncTotal?: number;
  invokedFuncCovered?: number;
  invokeTotal?: number;
  invokeCovered?: number;
};

type TOverviewVersion = {
  _id?: string;
  coverages?: number;
  versionName?: string;
  projectId?: string;
  projectName?: string;
  funcResultStatistic?: TFuncResultStatistic;
};

type TFunctionOverviewList = {
  _id?: string;
  status?: number;
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
  functionName?: string;
  fileId?: string;
  testCount?: number;
  fileName?: string;
  resultKind?: string;
};

type TFuncResultStatistic = {
  passed?: number;
  failed?: number;
  undefined?: number;
};

type TTestsOverviewList = {
  _id?: string;
  resultKind?: number;
  fileId?: string;
  functionId?: string;
  kind?: number;
  description?: string;
  number?: number;
  identifierNumber?: number;
  file?: TTestsOverviewListFile;
  function?: TTestsOverviewListFunction;
  identifier?: string;
};

type TTestsOverviewListFile = {
  _id?: string;
  path?: string;
};

type TTestsOverviewListFunction = {
  _id?: string;
  functionName?: string;
};
