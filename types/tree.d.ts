declare type TDefectsCount = {
  mandatory?: number;
  required?: number;
  advisory?: number;
};

declare type TFileTree = {
  fileId?: string;
  fileName?: string;
  path?: string;
  status?: number;
  kind?: number;
  defectsCount?: TDefectsCount;
  fileCount?: TObject;
  blockFilesCount?: TObject;
  statementCoverage?: number;
  branchCoverage?: number;
  mcdcCoverage?: number;
  failed?: boolean;
  content?: string;
  extra?: number;
  repository?: TRepository;
  unread?: boolean;
  [key: string]: any;
};

declare type TFileTreeGroup = TFileTree & {
  id: string;
  children: Array<TFileTreeGroup>;
  hasChildren: boolean;
  indeterminate?: boolean;
  isAllChildrenChecked?: boolean;
  checked?: boolean;
  functionStatus?: number;
  level?: number;
  expanded: boolean;
  loading: boolean;
  [key: string]: any;
};

declare type TSortRulesTreeGroup = TFileTreeGroup & {
  id?: string;
  name?: string;
  hasChildren?: boolean;
  children?: Array<TTreeItem>;
  icon?: string;
  total?: number;
  parentId?: string;
  className?: string;
  level?: number;
};
