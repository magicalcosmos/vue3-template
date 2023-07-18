type TPosition = {
  line: number;
  column: number;
};

type TLocation = {
  begin: TPosition;
  end: TPosition;
};

type TCondition = {
  id: number;
  value: boolean;
};

type TDecision = {
  return: boolean;
  cases: {
    conditions: Array<TCondition>;
  };
  mcdc: number;
};

type TStatement = {
  testIds?: {
    [key]?: boolean;
  };
} & TLocation;

type TNode = TLocation & {
  id?: string;
  nodeId?: string;
  label: string;
  kind?: string;
  operator?: string;
  nodeId?: number;
  testIds?: {
    [key]?: boolean;
  };
  coveredCaseIds?: Array<string>;
  decisions?: Array<TDecision>;
  statements?: Array<TStatement>;
};

type TNodeGroup = {
  id: string | undefined;
  state: string | undefined;
  value: TNode | undefined;
};

type TEdge = {
  startNodeId: number;
  endNodeId: number;
  label: string;
  testIds: {
    [key]?: boolean;
  };
};

type TEdgeGroup = {
  id: string;
  from: number;
  to: number;
  label: string;
  state: string;
  color?: string;
};

type TCFG = {
  functionId: string;
  nodes: Array<TNode>;
  edges: Array<TEdge>;
};

type TMacro = {
  '@expansion': string;
  location: TLocation;
};

type TMacros = {
  fileId: string;
  macros: TMacro[];
};

type TInvokeRelation = {
  coveredCaseIds: Array<string>;
  enableStub: boolean;
  end: boolean;
  fileId: string;
  filePath: string;
  functionId: string;
  functionName: string;
  functionType: string;
  insideProject: boolean;
  location: TPosition;
  children?: Array<TInvokeRelation>;
  path?: string;
};
