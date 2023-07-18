type TFileCount = {
  _: number;
  _c: number;
  _h: number;
  _gitignore: number;
};

type TAdministratorFiles = Partial<{
  id: string;
  fileId: string;
  fileName: string;
  name: string;
  path: string;
  status: number;
  kind: number;
  defectsCount: TDefectsCount;
  fileCount: TFileCount;
  repository: TRepository;
}>;
