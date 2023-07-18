type TMacros = {
  /**
   * 宏定义名称
   */
  key?: string;
  /**
   * 宏定义名称
   */
  value?: string;
  /**
   * 是否是管理员编译环境宏定义
   */
  isAdminMacros?: boolean;
};

type TEnvironments = {
  /**
   * 编译环境id
   */
  environmentId?: string;
  /**
   * 编译环境名称
   */
  environmentName?: string;
  /**
   * 编译环境描述
   */
  description?: string;
  /**
   * 包含目录
   */
  includes?: string[];
  /**
   * 宏定义
   */
  macros?: TMacros[];
  /**
   * 其他配置参数
   */
  arguments?: string;
  rootDirectory?: TRootDirectory;
};

type TAdministratorEnvironments = {
  /**
   * 分页
   */
  pagination?: TPaginationFilter;
  /**
   * 编译环境
   */
  environments?: TEnvironments[];
};

type TProjectTypeLanguageItem = {
  standards?: Array<string>;
};

type TProjectTypeLanguage = {
  c?: TProjectTypeLanguageItem;
  'c++'?: TProjectTypeLanguageItem;
};

type TProjectType = {
  compiler?: string;
  configs?: TObject;
  description?: string;
  environment?: string;
  system?: string;
  languages?: TProjectTypeLanguage;
};

type TProjectTypes = {
  /**
   * key为编译器名称
   */
  [key: string]: TProjectType;
};

type TCompilerLanguageItem = {
  description?: string;
  /**
   * 头文件后缀名选项
   */
  headers?: Array<string>;
  /**
   * standard选项， key为standard名称
   */
  standards?: TObject;
  /**
   * 源文件后缀名选项
   */
  suffixes?: Array<string>;
};

type TCompilerLanguages = {
  c?: TCompilerLanguageItem;
  'c++'?: TCompilerLanguageItem;
};

/**
 * 编译配置选项
 */
type TCompilationOption = {
  version?: string;
  /**
   * 编译器选项
   */
  'project types'?: TProjectTypes;
  system?: TObject;
  /**
   * 运行环境, key为名称
   */
  environments?: TObject;
  /**
   * 语言配置选项
   */
  languages?: TCompilerLanguages;
  properties?: TProperties;
};
