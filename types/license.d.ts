declare type TModuleDetail = {
  startDate: string;
  expiresDate: string;
  status: number;
  allowedExportFormat?: Array<string>;
  allowedImportFormat?: Array<string>;
};
declare type TModule = {
  staticAnalyze?: TModuleDetail;
  unitTest?: TModuleDetail;
  integrationTest?: TModuleDetail;
};
declare type TLicense = {
  companyName: string;
  cpuLimit: number;
  userLimit: number;
  language: Array<string>;
  modules: TModule;
};
declare type TLicenseResult = {
  licenseStatus?: number;
  licenseSCD?: number;
  license?: TLicense;
};
