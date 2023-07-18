declare type TFunction = {
  collectCoverage: boolean;
  cycleComplexity: number;
  description: string;
  fileId: string;
  fullName: string;
  index: number;
  userDefinedFields: TUserDefinedFields[];
  invokeCoverage?: number;
  invokedFuncCoverage?: number;
  statementCoverage?: number;
  branchCoverage?: number;
  mcdcCoverage?: number;
  functionId: string;
  functionName: string;
  isConstructor?: boolean;
  id: string;
  kind: number;
  language: string;
  name: string;
  parentId: string;
  location: TCodeLocation;
  mangledId: string;
  status?: number;
  nodeLevel?: number;
  testCaseCreate: boolean;
  [key: string]: any;
}
