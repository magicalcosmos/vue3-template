declare type TTime = {
  createAt?: number;
  visitAt?: number;
  finishAt?: number;
};

declare type TSystem = {
  includes: Array<string>;
};

declare type TRootDirectory = {
  id: string;
  fileId: string;
  fileName: string;
  name: string;
  path: string;
  status: number;
  kind: number;
  defectsCount?: TDefectsCount;
  fileCount?: any;
  blockFilesCount?: any;
  statementCoverage?: 0;
  branchCoverage?: 0;
  mcdcCoverage?: 0;
  invokeCoverage?: 0;
  invokeFuncCoverage?: 0;
  failed?: false;
};

declare type TLastVersion = TTime & {
  versionId: string;
  versionName: string;
  status: number;
  coverages: number;
  system: TSystem;
  rootDirectory: TRootDirectory;
  versionType: string;
};

declare type TProject = TTime & {
  projectId: string;
  projectName: string;
  status: number;
  lastVersion: TLastVersion;
  repository?: {
    type: string;
    url: string;
  };
  description?: string;
};

declare type TTestResult = {
  unknown: number;
  succeed: number;
  failed: number;
  noResult: number;
  runtimeError: number;
  exception: number;
  nonStrictSucceed: number;
  [key: string]: any;
};

declare type TTotal = {
  total: number;
};
declare type TStatistic = {
  function: TTotal;
  file: {
    total: number;
    headers: TTotal;
    languages: {
      c: TTotal;
      'c++': TTotal;
      [key: string]: any;
    };
    notCompiledCount: number;
    compileFailedCount: number;
    compiledCount: number;
    waiting4compiling: number;
    coverage: number;
    codeDefects: number;
    testResult: TTestResult;
    [key: string]: any;
  };
};

type TEventReminder = {
  configConfirmed: boolean;
  defectsCleared: number;
  firstVisit: number;
  parsed: boolean;
  regressionStatusPrompt: number;
  staticAnalyzeConfigConfirmed?: boolean;
  unitTestConfigConfirmed: boolean;
};

type TIntegrationTest = {
  autoNullCheck: boolean;
  coverages: number;
  eventReminder: TEventReminder;
  status: number;
  strictOutputCheck: boolean;
  timeoutTestRun: number;
  fileRelation: boolean;
};

type TStaticAnalyze = {
  analyzeTemplate: string;
  eventReminder: TEventReminder;
  status: number;
};

type TUnitTest = TIntegrationTest & {
  integrateQtLib: boolean;
  integrateStdLib: boolean;
  testIdentifierRule: TObject;
  timeoutTestGen: number;
  timeoutTestRun: number;
};

declare type TVersion = TTime & {
  versionId: string;
  versionName: string;
  oldVersionId: string;
  status: boolean;
  environment: string;
  environmentId: string;
  environmentChanged: boolean;
  environmentArgumentsShow?: boolean;
  projectType: string;
  language: string;
  ignoreAsm: boolean;
  system: TSystem;
  systemType: number;
  headers: {
    suffixes: Array<string>;
  };
  languages: {
    c?: {
      standard: string;
      suffixes: Array<string>;
    };
    'c++'?: {
      standard: string;
      suffixes: Array<string>;
    };
    [key: string]: any;
  };
  includes: Array<string>;
  macros: Array<TKV<string>>;
  timeout: number;
  coverages: number;
  caseSensitive: boolean;
  strictOutputCheck: boolean;
  exits: Array<string>;
  analyzeTemplate: string;
  integrateStdLib: boolean;
  integrationTest?: TIntegrationTest;
  unitTest?: TUnitTest;
  rootDirectory: TRootDirectory;
  'eventReminder.configConfirmed'?: boolean;
  'eventReminder.defectsCleared'?: number;
  'eventReminder.regressionStatusPrompt'?: number;
  'eventReminder.firstVisit': number;
  'eventReminder.parsed': boolean;
  arguments: Array<string>;
  includeFiles: Array<TKV<string>>;
  staticAnalyze: TStaticAnalyze;
  [key: string]: any;
};

type TOperation = {
  name: string;
  icon: string;
  methods?: string;
};

declare type TTestCount = {
  manually: number;
  automatically: number;
};

declare type TTestOverviewCount = {
  functionCount: number;
  testCount: TTestCount;
  invokedFuncCoverage?: number;
  invokeCoverage?: number;
  statementCoverage?: number;
  branchCoverage?: number;
  mcdcCoverage?: number;
};

declare type TDefectCount = {
  mandatory: number;
  required: number;
  advisory: number;
};

declare type TOverviewAll = {
  versionId: string;
  versionName: string;
  projectId: string;
  projectName: string;
  sourceFileCount: number;
  headerFileCount: number;
  integrationTest: TTestOverviewCount;
  unitTest: TTestOverviewCount;
  defect: {
    count: TDefectCount;
    kloc: TDefectCount;
  };
};

type TVersionList = {
  /**
   * 分页信息
   */
  pagination?: TPaginationFilter;
  /**
   * 版本信息列表
   */
  versions?: TLastVersion[];
};

type TDiffVersion = {
  /**
   * 新加的文件列表
   */
  addFiles: string[];
  /**
   * 修改的文件列表
   */
  modifyFiles: string[];
  /**
   * 删除的文件列表
   */
  deleteFiles: string[];
  /**
   * 代码新增行数
   */
  insertion: number;
  /**
   * 代码删除行数
   */
  deletion: number;
};

type THistory = {
  time: string;
  content: string;
};
