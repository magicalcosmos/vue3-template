declare type TStatistic = {};

declare type TOneKeyTestParams = {
  versionId?: string;
  fileIds?: Array<string>;
  functionIds?: Array<string>;
  exceptFileIds?: Array<string>;
  exceptFunctionIds?: Array<string>;
  extensions?: Array<string>;
  fileStatus?: Array<number>;
  coverageStatistics?: boolean;
  deleteDuplicateCases?: number;
};

declare type TLocation = {
  begin?: TCodeLocation;
  end?: TCodeLocation;
};

declare type TCodeLocation = {
  line?: number;
  column?: number;
};

declare type TCodeMirrorLocation = {
  line?: number;
  ch?: number;
};

declare type TAddTestCase = {
  functionId?: string;
  data: TObject;
  copyId: string;
  groupId: string | null;
};

declare type TLogLocation = {
  file: string;
  fileId: string;
  line: number;
  column: number;
};

declare type TUserDefinedFields = {
  key: string;
  name: string;
  value: string | null;
};

declare type TTestCase = {
  id?: string;
  index?: number;
  type?: string;
  testId?: string;
  functionId?: string;
  execCount?: number;
  kind?: number;
  description?: string;
  requirementInfo?: string;
  result?: {
    kind: number;
    log: string | null;
    location: TLogLocation;
  };
  userDefinedFields?: TUserDefinedFields[];
  number?: number;
  parentId?: string;
  index?: number;
  isEdit?: boolean;
  isSelect?: boolean;
  id?: string;
  linkDefectIds?: TObject;
  selectedNumber?: number;
  dataLength?: number;
  children?: Array<TTestCase>;
  groupId?: string;
  path?: string;
  fieldPath?: string;
  isUpdateImmdiately?: boolean;
  label?: string;
  data?: TTestCase;
};

declare type TTestCaseExtend = TTestCase &
  TFixedAddress & {
    /** 操作属性 */
    name?: string;
    opType?: string;
    unused?: boolean;
    scope?: string;
    times?: number;
    time?: number;
    typeName?: string;
    currentStubKind?: number;
    stubName?: string;
  };

declare type TTestCaseConfig = {
  dataDepth: number;
  dataType: Array<number>;
  variableType: Array<number>;
  displaySetting: string;
};

declare type TVariable = {
  fileId: string;
  functionId: string;
  mangleId: Array<string>;
  output: TObject;
  variables: TObject;
};

declare type TTypeSystem = {
  fileId: string;
  types: TObject;
};

declare type TMalloc = {
  typeName: string;
  name: string;
  editable: boolean;
  data: TObject;
  filedPath: string;
  fileId: string;
};

declare type TStubs = {
  name: string;
  currentStubKind: number;
  currentTimes: number;
  typeName: string;
  stubName: string;
  kind: number;
  editable: boolean;
  data: TObject;
  fieldPath: string;
  children: Array<TStubs>;
};

declare type TInvokeStubPointerTarget = {
  '@elementType': null | string;
  '@length': null | string;
  '@type': null | string;
};

declare type TFunctionInvokeItem = {
  enableStub: boolean;
  fileId: string;
  fileName: string;
  filePath: string;
  files: Array<TFile>;
  fromFuncId: string;
  functionId: string;
  functionName: string;
  id?: string;
  isCreateManual: boolean;
  isDefine: boolean;
  isSpecialization: boolean;
  mangledId: string;
  returnType: string;
  toFuncFileUpdate: boolean;
  pointerTargets?: {
    [key: string]: TInvokeStubPointerTarget;
  };
  [key: string]: any;
};

declare type TFunctionInvoke = {
  duplicateDefined: boolean;
  functions: Array<TFunctionInvokeItem>;
};

declare type TFixedAddress = {
  data: {
    '@value': string;
  };
  editable: boolean;
  fieldPath: string;
  fileId: string;
  filePath: string;
  kind: number;
  location: TObject;
  locations: TObject;
  name: string;
  originName: string;
  scope: number;
  type: number;
  skipIndex?: number;
};

declare type TDiagItem = {
  column?: number;
  commit?: string;
  file?: string;
  fileId?: string;
  line?: number;
  message?: string;
  type?: string;
  url?: string;
  versionId?: string;
};

declare type TEditorPos = {
  cursor?: number;
  scrollTo?: number;
};
