import { ComputedRef, InjectionKey, Ref } from 'vue';
import Statistic from '@/views/tester/UnitTesting/components/TestCaseFileTree/TreeFilterBar.vue';

// ======================= variable Block =======================

/** 文件树数据 */
export const FileTreeDataKey: InjectionKey<ComputedRef<Array<TFileTreeGroup>>> = Symbol('FileTreeDataKey');

/** 文件树中当前选中的数据 */
export const FileDataKey: InjectionKey<ComputedRef<TFileTreeGroup>> = Symbol('FileDataKey');

/** 过滤条件 */
export const FiltersKey: InjectionKey<ComputedRef<TObject>> = Symbol('FiltersKey');

/** 重新映射 */
export const ReDefineDataMapKey: InjectionKey<ComputedRef<TObject>> = Symbol('ReDefineDataMapKey');

/** 覆盖率是否显示 */
export const CoverageShowKey: InjectionKey<ComputedRef<boolean>> = Symbol('CoverageShowKey');

/** 文件中选中的节点的数据 */
export const SelectedFileTreeNodeKey: InjectionKey<ComputedRef<TFileTreeGroup>> = Symbol('SelectedFileTreeNodeKey');

/** 是文件或文件夹 */
export const IsFolderOrFileKey: InjectionKey<ComputedRef<boolean>> = Symbol('IsFolderOrFileKey');

/** 用例列表中勾选的测试用例 */
export const TestCaseSelectionListKey: InjectionKey<ComputedRef<Array<string>>> = Symbol('TestCaseSelectionListKey');

/** 测试用例编组面包屑数据 */
export const TestCaseBreadcrumbKey: InjectionKey<ComputedRef<Array<string>>> = Symbol('TestCaseBreadcrumbKey');

/** 测试用例列表 */
export const TestCaseListKey: InjectionKey<ComputedRef<Array<TObject>>> = Symbol('TestCaseListKey');

/** 文件树中当前选中的函数数据 */
export const FunctionDataKey: InjectionKey<ComputedRef<TFunction>> = Symbol('FunctionDataKey');

/** 测试用例列表当前选中的测试用例 */
export const SelectedTestCaseKey: InjectionKey<ComputedRef<TTestCase>> = Symbol('SelectedTestCaseKey');

/** 测试用例详情页字段显示配置 */
export const TestCaseFieldConfigKey: InjectionKey<ComputedRef<TTestCaseConfig>> = Symbol('TestCaseFieldConfigKey');

/** 调用公共库生成的数据 */
export const TransformerKey: InjectionKey<TObject> = Symbol('TransformerKey');

/** 检查项数据 */
export const CheckedDataKey: InjectionKey<TObject> = Symbol('CheckedDataKey');

/** Tab测试用例, 单个测试用例组装后的详情数据 */
export const TestCaseTreeDataKey: InjectionKey<ComputedRef<Array<TTestCase>>> = Symbol('TestCaseTableDataKey');

/** 公共库存返回的测试用例数据 */
export const TestCaseDataKey: InjectionKey<ComputedRef<TTestCase>> = Symbol('TestCaseDataKey');

/** 公共库存返回的变量数据 */
export const VariablesDataKey: InjectionKey<ComputedRef<TVariable>> = Symbol('VariablesDataKey');

/** 公共库存返回的类型系统数据 */
export const TypeSystemDataKey: InjectionKey<ComputedRef<TTypeSystem>> = Symbol('TypeSystemDataKey');

/** Tab切换，当前选中的Tab页 */
export const TabIndexKey: InjectionKey<Ref<Number>> = Symbol('TabIndexKey');

/** 文件是否解析过, 函数是否执行过 */
export const IsCompiledKey: InjectionKey<ComputedRef<Boolean>> = Symbol('IsCompiledKey');

/** 源代码是否更改过 */
export const IsSourceCodeChangedKey: InjectionKey<ComputedRef<boolean>> = Symbol('IsSourceCodeChanged');

/** CFG选中的测试用例列表 */
export const CFGSelectedTestCasesKey: InjectionKey<ComputedRef<Array<string>>> = Symbol('CFSelectedTestCasesKey');

/** 指针目标数据 */
export const MallocDataKey: InjectionKey<ComputedRef<Array<TMalloc>>> = Symbol('MallocDataKey');

/** 桩函数数据 */
export const StubsDataKey: InjectionKey<ComputedRef<Array<TStubs>>> = Symbol('StubsDataKey');

/** 函数调用数据 */
export const FunctionInvokeDataKey: InjectionKey<ComputedRef<TFunctionInvoke>> = Symbol('FunctionInvokeDataKey');

/** 绝对地址数据 */
export const FixedAddressDataKey: InjectionKey<ComputedRef<Array<TFixedAddress>>> = Symbol('FixedAddressDataKey');

/** 集成测试 -  CFG/调用关系图tab */
export const CFGInvokeGraphTabKey: InjectionKey<ComputedRef<string>> = Symbol('CFGInvokeGraphTabKey');

/** 测试用例详情页-绝对地址，跳转至主Tab-源代码页 并拉取最新代码选把相应的绝对地址 */
export const GoToSourceCodeTabDataKey: InjectionKey<ComputedRef<TFixedAddress>> = Symbol('GoToSourcecodeTabDataKey');

/** 测试用例详情页-绝对地址，跳转位置 */
export const EditorPosMoveKey: InjectionKey<ComputedRef<TEditorPos>> = Symbol('EditorPosMoveKey');

/** 测试用例详情页-聚焦位置数据信息 */
export const FocusingDataKey: InjectionKey<ComputedRef<TObject>> = Symbol('FocusingDataKey');

// ======================= function Block =======================

/** 更新测试用例列表 */
export const UpdateTestCaseListKey: InjectionKey<Function> = Symbol('UpdateTestCaseListKey');

/** 更新选中的测试用例 */
export const UpdateSelectedTestCaseKey: InjectionKey<Function> = Symbol('UpdateSelectedTestCaseKey');

/** 更新勾选的测试用例列表 */
export const UpdateTestCaseSelectionListKey: InjectionKey<Function> = Symbol('UpdateTestCaseSelectionListKey');

/** 更新测试用例面包屑导航 */
export const UpdateTestCaseBreadcrumbKey: InjectionKey<Function> = Symbol('UpdateTestCaseBreadcrumbKey');

/** 更新是否是文件或文件夹 */
export const UpdateIsFolderOrFileKey: InjectionKey<Function> = Symbol('UpdateIsFolderOrFileKey');

/** 更新选中的文件树节点 */
export const UpdateSelectedFileTreeNodeKey: InjectionKey<Function> = Symbol('UpdateSelectedFileTreeNode');

/** 更新源代码更改状态 */
export const UpdateIsSourceCodeChangedKey: InjectionKey<Function> = Symbol('UpdateIsSourceCodeChangedKey');

/** 保存源代码 */
export const SaveSourceCodeKey: InjectionKey<Function> = Symbol('SaveSourceCodeKey');

/** 源代码定位行 */
export const UpdateSourceCodeGoToLineKey: InjectionKey<Function> = Symbol('UpdateSourceCodeGoToLineKey');

/** 组装字段 */
export const _setFieldKey: InjectionKey<Function> = Symbol('_setFieldKey');

/** 组装字段子节点 */
export const _setFieldChildrenKey: InjectionKey<Function> = Symbol('_setFieldChildrenKey');

/** 测试用例相关通用按钮事件 */
export const TestCaseButtonEventKey: InjectionKey<Function> = Symbol('TestCaseButtonEventKey');

/** 更新CFG选中的测试用例 */
export const UpdateCFGSelectedTestCasesKey: InjectionKey<Function> = Symbol('UpdateCFGSelectedTestCasesKey');

/** 缩放 */
export const ZoomKey: InjectionKey<Function> = Symbol('ZoomKey');

/** 状态重置 */
export const ZoomResetKey: InjectionKey<Function> = Symbol('ZoomResetKey');

/** 方向改变 */
export const ChangeDirectionKey: InjectionKey<Function> = Symbol('DirectionKey');

/** 编辑测试用例 */
export const EditTestCaseAPIKey: InjectionKey<Function> = Symbol('EditTestCaseAPIKey');

/** 编辑测试用例 */
export const GetAllDataKey: InjectionKey<Function> = Symbol('GetAllDataKey');

/** 更新指针目标数据 */
export const UpdateMallocDataKey: InjectionKey<Function> = Symbol('UpdateMallocDataKey');

/** 更新桩函数数据 */
export const UpdateStubsDataKey: InjectionKey<Function> = Symbol('UpdateStubsDataKey');

/** 更新函数调用数据 */
export const UpdateFunctionInvokeDataKey: InjectionKey<Function> = Symbol('UpdateFunctionInvokeDataKey');

/** 更新绝对地址数据 */
export const UpdateFixedAddressDataKey: InjectionKey<Function> = Symbol('UpdateFixedAddressDataKey');

/** 悬浮框 */
export const FloatingBallPopKey: InjectionKey<Function> = Symbol('FloatingBallPopKey');

/** 修改过滤条件 */
export const ChangeFiltersKey: InjectionKey<Function> = Symbol('ChangeFiltersKey');

/** 修改文件树数据 */
export const ChangeFileTreeDataKey: InjectionKey<Function> = Symbol('ChangeFileTreeData');

/** 修改覆盖率显示 */
export const ChangeCoverageShowKey: InjectionKey<Function> = Symbol('ChangeCoverageShowKey');

/** 修改缓存数据 */
export const UpdateReDefineDataMapKey: InjectionKey<Function> = Symbol('UpdateReDefineDataMapKey');
/** TreeFilterBar 实例 */
export const TreeFilterBarRefKey: InjectionKey<Ref<InstanceType<typeof Statistic>>> = Symbol('TreeFilterBarRefKey');

/** 测试用例详情页-绝对地址，跳转至主Tab-源代码页 并拉取最新代码选把相应的绝对地址 */
export const UpdateGoToSourceCodeTabDataKey: InjectionKey<Function> = Symbol('UpdateGoToSourceCodeTabDataKey');

/** 获取文件树头文件、源文件、覆盖率个数统计函数 */
export const StatisticsFnKey: InjectionKey<Function> = Symbol('StatisticsFnKey');

/** 文件树头文件、源文件、覆盖率个数统计数据 */
export const StatisticDataKey: InjectionKey<ComputedRef<TStatistic>> = Symbol('StatisticsDataKey');

/** 更新版本覆盖率 */
export const UpdateCoverageFnKey: InjectionKey<Function> = Symbol('UpdateCoverageFnKey');

/** 设置版本配置数据 */
export const SetVersionFnKey: InjectionKey<Function> = Symbol('SetVersionFnKey');
/** Tab切换，更新当前选中的Tab页 */
export const UpdateTabIndexKey: InjectionKey<Function> = Symbol('UpdateTabIndexKey');

/** 测试用例详情页-绝对地址，更新跳转位置 */
export const UpdateEditorPosMoveKey: InjectionKey<Function> = Symbol('UpdateEditorPosDataKey');

/** 更新公共库数据 */
export const UpdateTransformerKey: InjectionKey<Function> = Symbol('UpdaeTransformerKey');

/** 测试用例详情 - 保存单个值 */
export const SaveTestCaseValueKey: InjectionKey<Function> = Symbol('SaveTestCaseValueKey');

/** 测试用例详情页-更新聚焦位置数据信息 */
export const UpdateFocusingDataKey: InjectionKey<Function> = Symbol('UpdateFocusingDataKey');

/** 更新用例标识 */
export const UpdateTestIdentifierRuleKey: InjectionKey<Function> = Symbol('UpdateTestIdentifierRuleKey');

/** 更新数据深度 */
export const UpdateDataDepthKey: InjectionKey<Function> = Symbol('UpdateDataDepthKey');

/** 更新用例通过准则 */
export const UpdateCasePassRuleKey: InjectionKey<Function> = Symbol('UpdateCasePassRuleKey');

/** 更新全局覆盖状态 */
export const UpdateDataDepthCoverAllKey: InjectionKey<Function> = Symbol('UpdateDataDepthCoverAllKey');

/** 集成测试 更新调用关系和CFG TAB 选项 */
export const UpdateCFGInvokeGraphTabKey: InjectionKey<Function> = Symbol('UpdateCFGInvokeGraphTabKey');

/** Tab测试用例, 更新单个测试用例组装后的详情数据 */
export const UpdateTestCaseTreeDataKey: InjectionKey<Function> = Symbol('UpdateTestCaseTableDataKey');

/** 更新文件树中当前选中的函数数据 */
export const UpdateFunctionDataKey: InjectionKey<Function> = Symbol('UpdateFunctionDataKey');

/** 通过路径查找组装后测试用例某个数据 */
export const FindItemDataInTestCaseTreeDataKey: InjectionKey<Function> = Symbol('FindItemDataInTestCaseTreeDataKey');

/** 通过路径查找某个数据 */
export const FindItemDataByFieldPathKey: InjectionKey<Function> = Symbol('FindItemDataByFieldPathKey');

/** 更新组装后的数据，修改数据的即时刷新 */
export const UpdateTestCaseTreeDataByManualKey : InjectionKey<Function> = Symbol('UpdateTestCaseTreeDataByManualKey');

/** 更新组装后的数据，删除数据的即时刷新 */
export const DeleteItemDataByFieldPathKey : InjectionKey<Function> = Symbol('DeleteItemDataByFieldPathKey');
