// 任务列表类型定义
type TTaskItem = {
  createAt: number;
  finishAt?: number;
  fileCount: number;
  functionCount: number;
  number: number;
  progress: number;
  projectId: string;
  projectName: string;
  spent: number;
  status: number;
  taskId: string;
  testCaseCount: number;
  testType: number;
  type: number;
  masterVersionId?: string;
  versionId: string;
  versionName: string;
};
