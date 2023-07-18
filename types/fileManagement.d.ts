type TBlockFilesCount = Partial<{
  _c: number;
  _h: number;
}>;

type TDefectsCount = Partial<{
  mandatory: number;
  required: number;
  advisory: number;
}>;

type TFileTree = Partial<{
  id: string;
  fileId: string;
  parentId: string;
  fileName: string;
  name: string;
  path: string;
  status: number;
  kind: number;
  blockFilesCount: TBlockFilesCount;
  statementCoverage: number;
  branchCoverage: number;
  mcdcCoverage: number;
  defectsCount: TDefectsCount;
  failed: boolean;
  unread: boolean;
  children: TFileTree[];
  [key: string]: any;
}>;

type TTreeResponse = {
  tree: TFileTree;
  total: number;
};

type TCompilerType = {
  projectType: string;
};

type TCompilationOptions = {
  compilers: TObject;
  /**
   * 环境集合
   */
  environments: TObject;
  /**
   * 项目类型合集
   */
  languages: TLanguages;
  /**
   * 编译器合集
   */
  'project types': TObject;
  /**
   * 编译参数合集
   */
  properties: TProperties[];
  /**
   * 系统合集
   */
  system: TObject;
  /**
   * 配置版本信息
   */
  version: string;
};

type TProperties = {
  name?: string;
  description?: string;
  argument?: string;
  language?: string;
  options?: Array<TPropertiesOptions>;
  value?: string;
};

type TPropertiesOptions = {
  name?: string;
  argument?: string;
};

type TLanguages = {
  c: TLanguagesDetail;
  'c++': TLanguagesDetail;
};

type TLanguagesDetail = {
  description: string;
  headers: string[];
  standards: TObject;
  suffixes: string[];
};
