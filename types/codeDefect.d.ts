type TCodePosition = {
  line: number | null;
  column: number | null;
};
type TCodeLocation = {
  begin: TCodePosition;
  end?: TCodePosition;
  type: Dict.TDefectLocationType;
};
/** 缺陷列表数据 */
type TDefectTestCase = {
  id: string;
  number: number;
};
/** 缺陷列表数据 */
type TDefectItem = {
  defectId: string;
  description: string;
  fileId: string;
  functionId: string;
  locations: TCodeLocation[];
  manual: boolean;
  projectId: string;
  testcases: TDefectTestCase[];
  unread: boolean;
  versionId: string;
};

/** 缺陷列表 */
type TCodeDefects = {
  data: TDefectItem[];
  total: number;
  unreadTotal: number;
};
