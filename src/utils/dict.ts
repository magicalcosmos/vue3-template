/**
 * file and function type
 */
export const KIND = {
  FILE: 1, // 文件
  DIRECTORY: 2, // 目录
  NAMESPACE: 10, // 命名空间
  NAMESPACEUNDERTEMPLATE: 13, // 命名空间
  CLASS: 20, // 普通类
  TEMPLATECLASS: 21, // 模板类
  SPECILIZECLASS: 22, // 特化类
  CLASSUNDERTEMPLATE: 23, // 模板元素下的类
  FUNCTION: 30, // 普通函数
  TEMPLATEFUNCTION: 31, // 模板函数
  SPECILIZEFUNCTION: 32, // 特化函数
  FUNCTIONUNDERTEMPLATE: 33, // 模板元素下的函数
  STRUCT: 40, // 普通结构体
  TEMPLATESTRUCT: 41, // 模板结构体
  SPECILIZESTRUCT: 42, // 特化结构体
  STRUCTUNDERTEMPLATE: 43, // 模板元素下的结构体
};

/**
 * right menu events
 */
export const RIGHT_MENU_TYPES = {
  IMPORT: 1, // 导入
  REPLACE_FILE: 2, // 替换文件
  REPLACE_FOLDER: 3, // 替换文件夹
  DELETE: 4, // 删除文件
  DELETE_FOLDER: 5, // 删除文件夹
  NEW_FOLDER: 6, // 新建文件夹
  DELETE_SPECIALIZED_RESULT: 7, // 删除特化结果
};
/**
 * compilation machine system for gcc
 */
export const SYSTEM_TYPE = {
  BIT0: 0, // 不指定
  BIT32: 32, // 32位系统
  BIT64: 64, // 64位系统
};

/**
 * role
 */
export const ROLES = {
  SUPERADMIN: 1, // 超级用户（不可删除，不可更改角色）
  ADMIN: 2, // 系统管理员
  TESTER: 4, // 测试人员
  TESTERMANAGER: 8, // 测试经理
} as const;
export type TRoles = typeof ROLES[keyof typeof ROLES];

/**
 * file upload type
 */
export const REPOSITORY_TYPE = {
  FILE: 1, // 文件上传
  GIT: 2, // git检出
};

/**
 * task type
 */
export const TASK_TYPE = {
  RESOLVESOURCECODE: 1, // 解析中
  GENTERATEDTESTCASE: 2, // 测试用例生成
  EXECUTEDTESTCASE: 3, // 测试用例执行
  ONEKEYTEST: 4, // 一键测试
  STATICTEST: 5, // 静态测试
  STATICTEST_REGRESSION: 6, // 静态回归
  EXPORTTESTSCRIPT: 7, // 导出测试脚本
  ONE_KEY_REGRESSION: 8, // 单元集成一键回归
  ONE_KEY_ADDITIONAL_TEST: 10, // 一键补充测试
};

/**
 * 回归版本中老版本变化
 */
export const REGRESSION_STATUS_PROMPT = {
  NONE: 0, // 无改变
  DELETED: 1, // 老版本被删除
  EDIT: 2, // 老版本被修改
};

/**
 * task page type
 */
export const TASK_PAGE_TYPE = {
  ALL: 'all', // 所有任务
  PERSONAL: 'personal', // 我的任务
};

/**
 * task status
 */
export const TASK_STATUS = {
  WAITING: 0, // 等待
  EXECUTING: 1, // 正在执行
  FINISHED: 2, // 完成
  PAUSING: 3, // 正在中止
  PAUSED: 4, // 已中止
  CANCELING: 5, // 正在取消
  CANCELLED: 6, // 已取消
};

/**
 * file status
 */
export const FILE_STATUS = {
  DELETING: -1, // 正在删除
  INITIALIZED: 0, // 刚创建完/初始化状态
  DOWNLOADING: 1, // 正在下载
  DOWNLOAD_FAILED: 2, // 下载失败
  DOWNLOAD_FINISHED: 3, // 下载完成
  CHECKOUT: 11, // 正在检出（git）
  CHECKOUT_FAILED: 12, // 检出失败（git）
  CHECKOUT_SUCCEED: 13, // 检出成功（git）
  DECOMPRESSING: 101, // 正在解压缩
  DECOMPRESSION_FAILED: 102, // 解压缩失败
  DECOMPRESSION_FINISHED: 103, // 解压缩完成
  UNCOMPILED: 201, // 未编译
  COMPILING: 203, // 正在编译
  COMPILATION_FAILED: 204, // 编译失败
  COMPILATION_SUCCEED: 205, // 编译成功
  WAITING_COMPILAION: 206, // 待编译
};

/**
 * 函数变更
 */
export const FUNCTION_CHANGE = {
  MODIFIED: 'modified', // 函数修改
  ADDED: 'added', // 函数新增
};

/**
 * coverages
 */
export const COVERAGES = {
  STATEMENTCOVERAGE: 1, // 语句覆盖
  BRANCHCOVERAGE: 2, // 分支覆盖
  MCDCCOVERAGE: 4, // MC/DC覆盖
  CALLCOVERAGE: 8, // 调用覆盖
  FUNCTIONCOVERAGE: 16, // 函数覆盖
};

/**
 * compiled information
 */
export const COMPILED_INFO = {
  WARNING: 'warning', // 警告
  ERROR: 'error', // 错误
  FATAL_ERROR: 'fatal error', // 严重错误
  FILE_STATUS: 'FILE_STATUS',
};

/**
 * test case executed result kind
 */
export const TEST_RESULT_KIND = {
  NOT_EXECUTE: 0, // 未执行
  SUCCEED: 1, // 执行成功
  FAILED: 2, // 执行失败
  NO_RESULT: 3, // 无结果
  SUCCEED_WITHOUT_EXPECT: 4, // 预期值设置通过
  RUNTIME_ERROR: 101, // 运行时错误
  TIMEOUT: 102, // 超时
  SYSTEM_ERROR: 111, // 系统错误
  INSTRUMENT_ERROR: 112, // 插桩错误
  COMPILE_ERROR: 113, // 编译错误
};

/**
 * test case executed result kind option
 */
export const TEST_RESULT_KIND_OPTION = {
  EXECUTE_EXECEPTION: [
    TEST_RESULT_KIND.SYSTEM_ERROR,
    TEST_RESULT_KIND.INSTRUMENT_ERROR,
    TEST_RESULT_KIND.COMPILE_ERROR,
  ], // 执行异常
  RUNTIME_ERROR: [TEST_RESULT_KIND.RUNTIME_ERROR, TEST_RESULT_KIND.TIMEOUT], // 运行时错误
};

/**
 * test case kind 位运算值
 */
export const TEST_CASE_KIND = {
  MANUAL: 0, // 手动
  AUTO: 1 | 2 | 4 | 1024 | 1048576 | 2097152 | 4194304 | 8388608 | 1073741824, // 自动
  AUTO_DEFECT: 1048576 | 2097152 | 4194304 | 8388608, // 自动检查缺陷
  DIVIDE_ZERO: 2097152, // 除零
  NULL_POINTER: 4194304, // 空指针
  OUT_OF_BOUNDS: 8388608, // 数组越界
  COVERAGE_CALC_PARAM: 2097152 | 4194304 | 8388608, // 语句覆盖需要
};

/**
 * login
 */
export const LOGIN = {
  USERNAME: 'username',
  PASSWORD: 'password',
  SESSIONID: 'SESSIONID',
  TOKEN: 'rocket-token', // token
  LANG: 'rocket-lang', // 语言
};
/**
 * websocket domain
 */
export const DOMAIN = {
  USER: 'user',
  LICENSE: 'license',
  PROJECT: 'project',
  PROJECTVERSION: 'projectVersion',
  FILE: 'file',
  FUNCTION: 'function',
  TESTCASE: 'testCase',
  TASK: 'task',
  FILEDEFECT: 'fileDefect',
  CODEDEFECT: 'codeDefect',
  PROGRESS: 'progress',
};

/**
 * websocket status code
 */
export const CMD = {
  ACCEPT: 'accept',
  REFUSE: 'refuse',
  SUBSCRIBE: 'subscribe',
  REFUSESUBSCRIBE: 'refuseSubscribe',
  UNSUBSCRIBE: 'unsubscribe',
  REFUSEUNSUBSCRIBE: 'refuseUnsubscribe',
  UPDATE: 'update',
  DELETE: 'delete',
  REMOVE: 'remove',
  ADD: 'add',
  GENERATORTEST: 'generator-tests',
  CLEARALLDEFECTS: 'clear-all-defects',
  CLEARFILEDEFECTS: 'clear-file-defects',
  CLEARDEFECTSRULES: 'clear-defects-rules',
  CLOSE: 4001, //服务端强制关闭（比如用户在其他地方登录）
};

/**
 * version command
 */
export const VERSION_CMD = {
  IMPORT: 1,
  DELETE: 2,
  REPLACE: 3,
  EDIT: 4,
  RELOAD: 5,
};
/**
 * project command
 */
export const PROJECT_CMD = {
  CREATE: 1,
  DELETE: 2,
  RENAME: 3,
};
/**
 * file type
 */
export const FILETYPE = {
  type1: 'c',
  type2: 'c++',
};
/**
 * code language
 */
export const CODE_LANGUAGE = {
  C: 'c',
  CPP: 'c++',
};
/**
 * constructor func
 */
export const CONSTRUCTOR_FUNC = {
  key: '@nameparams',
  value: '@mangled',
};
/**
 * tab
 */
export const TAB = {
  /** Tab - 源代码 */
  SOURCECODE: 0,
  /** Tab - 测试用例 */
  TESTCASE: 1,
  /** Tab - CFG覆盖分析 */
  CFG: 2,
};
/**
 * rules level
 */
export const RULES_LEVEL = {
  CONSTRAINT: 1,
  REQUIREMENT: 2,
  SUGGESTION: 3,
};

/**
 * test type
 */
export const TEST_TYPE = {
  STATICANALYSIS: 1,
  UNITTEST: 2,
  INTEGRATION_TEST: 3,
};
/**
 * version type
 */
export const VERSION_TYPE = {
  STATIC_ANALYSIS: 'staticAnalyze',
  UNIT_TEST: 'unitTest',
  INTEGRATION_TEST: 'integrationTest',
} as const;
export type TVersionType = typeof VERSION_TYPE[keyof typeof VERSION_TYPE];
/**
 * defects status
 */
export const DEFECT_STATUS = {
  TOBEMODIFIED: 0,
  MODIFIED: 1,
  IGNORE: 2,
  MISREPORT: 3,
};
/**
 * license status
 */
export const LICENSE_STATUS = {
  NORMAL: 0, // 正常
  INVALID: 1, // 解析异常，此时无License信息
  NOT_MATCH_MACHINE: 2, // 与机器码不匹配，此时无license信息
  EXPIRED: 4, // 过期
  USERS_OVER_LIMIT: 8, // 超出测试用户上限
  SYSTEM_TIME_EXCEPTION: 16, // 系统时间异常
};

export const MODULE_STATUS = {
  NORMAL: 0, //  正常
  EXPIRED: 1, // 过期
  BEFORE: 2, // 系统时间被篡改，并且当前时间在可用时间范围之前
  IN: 3, // 系统时间被篡改
  EXCEPTION: 4, //子模块异常
  WILL_EXPIRE: 5, //子模块即将过期
};
/**
 * license function which user buy
 */
export const LICENSE_FUNC = {
  STATICANALYZE: 'staticAnalyze',
  UNITTEST: 'unitTest',
  INTEGRATION_TEST: 'integrationTest',
};
/**
 * test case manual
 */
export const MANUAL = {
  AUTO: 0,
  MANUAL: 1,
};
/**
 * test case manual
 */
export const DEFECT_LOCATION_TYPE = {
  SINGLE: 'single', // 代码位置
  RANGE: 'range', // 代码块
} as const;
export type TDefectLocationType = typeof DEFECT_LOCATION_TYPE[keyof typeof DEFECT_LOCATION_TYPE];
/**
 * cfg and invoke graph
 */
export const CFG_INVOKE_GRAPH = {
  CFG: 'cfg',
  INVOKEGRAPH: 'invoke_graph',
};
/**
 * node kind
 * @property START 起始点
 * @property END 终止点
 * @property PLAIN 普通节点
 * @property SELECT 判定节点
 */
export const NODE_KIND = {
  START: 1,
  END: 2,
  PLAIN: 3,
  SELECT: 4,
};
/**
 * 数据类型
 */
export const DATATYPE = {
  INPUT: 1, // 输入
  OUTPUT: 2, // 输出
};
/**
 * 变量类型
 */
export const VARIABLE_TYPE = {
  GLOBAL: 1, // 全局变量
  PARAMS: 2, // 形参
  POINTERTARGET: 3, // 指针目标
  STUBS: 10, // 桩函数
  ABSOLUTEADDRESS: 20, // 绝对地址
  STATICS: 23, // 局部静态变量
};
/**
 * 文件上传类型
 */
export const FILE_UPLOAD_SOURCE_TYPE = {
  FILE: 1, // 本地文件或远程文件
  GIT: 2, // Git仓库文件
  SVN: 3, // SVN仓库文件
};

/**
 * 步骤
 */
export const STEP = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

/**
 * 检出错误类型
 */
export const CHECKOUT_ERROR = {
  /**
   * git路径错误
   */
  GIT_REPOSITORY_NOT_FOUND: 1,
  /**
   * git分支错误
   */
  GIT_BRANCH_NOT_FOUND: 2,
  /**
   * svn用户名或密码错误
   */
  GIT_AUTHENTICATION_FAILED: 3,
  /**
   * git其它检出错误
   */
  GIT_OTHER_ERROR: 9,
  /**
   * svn路径错误
   */
  SVN_REPOSITORY_NOT_FOUND: 10,
  /**
   * svn用户名或密码错误
   */
  SVN_AUTHENTICATION_FAILED: 11,
  /**
   * svn其它检出错误
   */
  SVN_OTHER_ERROR: 19,
  /**
   * 远程文件下载失败
   */
  REMOTE_FILE_DOWNLOAD_FAILED: 20,
  /**
   * 上传文件解压失败
   */
  UPLOAD_FILE_EXTRACT_FAILED: 30,
  /**
   * 上传文件移动失败
   */
  UPLOAD_FILE_MOVE_FILE_FAILED: 31,
} as const;

/**
 * 检出错误描述
 */
export const CHECKOUT_ERROR_DESC = {
  [CHECKOUT_ERROR.GIT_REPOSITORY_NOT_FOUND]: 'upload.git_repository_not_found',
  [CHECKOUT_ERROR.GIT_BRANCH_NOT_FOUND]: 'upload.git_branch_not_found',
  [CHECKOUT_ERROR.GIT_AUTHENTICATION_FAILED]: 'upload.git_authentication_failed',
  [CHECKOUT_ERROR.GIT_OTHER_ERROR]: 'upload.git_other_error',
  [CHECKOUT_ERROR.SVN_REPOSITORY_NOT_FOUND]: 'upload.svn_repository_not_found',
  [CHECKOUT_ERROR.SVN_AUTHENTICATION_FAILED]: 'upload.svn_authentication_failed',
  [CHECKOUT_ERROR.SVN_OTHER_ERROR]: 'upload.svn_other_error',
  [CHECKOUT_ERROR.REMOTE_FILE_DOWNLOAD_FAILED]: 'upload.remote_file_download_failed',
  [CHECKOUT_ERROR.UPLOAD_FILE_EXTRACT_FAILED]: 'upload.upload_file_extract_failed',
  [CHECKOUT_ERROR.UPLOAD_FILE_MOVE_FILE_FAILED]: 'upload.upload_file_move_file_failed',
} as const;
/**
 * 用例数据类型
 */
export const TEST_CASE_GROUP_TYPE = {
  GROUP: 'group', // 编组
  TESTCASE: 'testcase', // 测试用例
};

/**
 * 在线状态
 */
export const ONLINE_STATUS = {
  OFF: '1',
  ON: '2',
};

/**
 * 结构体数据
 */
export const DISPLAY_SETTING = {
  /**精简显示 */
  SIMEPLEDISPLAY: '0',
  /**全部显示 */
  ALLDISPLAY: '1',
};

/**
 * 导入用例格式
 */
export const ALLOWED_IMPORT_FORMAT = {
  SRT: 'srt',
  XLSX_HUICHENG: 'xlsx-huicheng',
  XLSX_XLSM_614: 'xlsx/xlsm-614',
};

/**
 * 函数执行结果
 */
export const FUNC_RESULT = {
  /** 通过 */
  PASSED: 'passed',
  /** 未通过 */
  FAILED: 'failed',
  /** 未定义 */
  UNDEFINED: 'undefined',
};

/**
 * URL字段
 */
export const URL_CODE = {
  TREE_CHECKED_CODE: 'tree_checked_code', // 文件树默认选中
};

/**
 * 创建类型
 */
export const CREATE_TYPE = {
  /**
   * 项目
   */
  PROJECT: 'project',
  /**
   * 版本
   */
  VERSION: 'version',
} as const;
export type TCreateType = typeof CREATE_TYPE[keyof typeof CREATE_TYPE];

export const REVISION_CONTROL = {
  GIT: 'git',
  SVN: 'svn',
} as const;
export type TRevisionControl = typeof REVISION_CONTROL[keyof typeof REVISION_CONTROL];

export const OPERATION_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
  COPY: 'copy',
  DELETE: 'delete',
  IMPORT: 'import',
  REPLACE: 'replace',
  MOVE_UP: 'moveUp',
  MOVE_DOWN: 'moveDown',
  SELECT: 'select',
} as const;
export type TOperationType = typeof OPERATION_TYPE[keyof typeof OPERATION_TYPE];

/**
 * 缺陷等级
 */
export const DEFECT_LEVEL = {
  mandatory: 1, // 强制
  required: 2, // 要求
  advisory: 3, // 建议
  recommend: 4, // 推荐
  necessary: 5, // 必要
  highlyRecommended: 6, // 强烈推荐
} as const;

export type TDefectLevelType = typeof DEFECT_LEVEL[keyof typeof DEFECT_LEVEL];

/**
 * 桩函数触发类型
 */
export const STUB_TRIGGER_KIND = {
  /**
   * 代码解析的桩函数
   */
  parse: 1,
  /**
   * 手动添加的桩函数
   */
  manual: 2,
  /**
   * 构造函数插桩
   */
  constructor: 3,
};

/**
 * 桩类型
 */
export const STUB_KIND = {
  /** 赋值打桩 */
  value: 1,
  /** 代码打桩 */
  code: 2,
};

/**
 * file upload type
 */
export const RESPOSITORY_TYPE = {
  FILE: 1, // 文件上传
  GIT: 2, // git检出
};

/**
 * 设置覆盖率范围
 */
export const COLLECT_COVERAGE_KIND = {
  all: 1, // 收集整个版本
  partial: 2, // 收集部分数据
};

/**
 * 审计状态
 */
export const AUDIT_STATUS = {
  toBeModified: 0,
  modified: 1,
  ignore: 2,
  misreport: 3,
};

/**
 * 测试用例详情操作类型
 */
export const OP_TYPE = {
  /** 添加测试用例 */
  ADD: 'ADD',
  /** 编辑测试用例 */
  EDIT: 'EDIT',
  /** 复制测试用例 */
  COPY: 'COPY',
  /** 删除测试用例 */
  DELETE: 'DELETE',
  /** 清空所有测试用例 */
  CLEAR: 'CLEAR',
};
export default {};
