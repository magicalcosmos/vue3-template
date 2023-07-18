export type TFilter = {
  // common
  countTime: (time: string | number | null | undefined) => string;
  numberFormatter: (num: number, digits: number) => string;
  html2Text: (val: string) => string;
  formatTimestamp: (timestamp: number, formatStr: string) => string;
  parseTime: (time: number, cFormat?: string) => string | undefined;
  numberToFixed: (digital: number, count: number) => number;
  numberToFixedWithSign: (digital: number, count: number, unit?: string) => string;
  toThousandsFilter: (num: number) => string;
  parsePath: (obj: Object, path: string) => Object | undefined;

  // testCase
  dictTranslate: (value: string, dictType: string) => string;
  passed: (testCases: Array<any>) => number;
  unPassed: (testCases: Array<any>) => number;
  iate: (str: number) => string;
  versionStatus: (project) => string;
  except: (testCases: Array<any>) => number;
  outputComparator: (param, ca) => string;
  parseStringToInt: (str: string) => number;
};
