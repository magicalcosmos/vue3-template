/** 获取accessToken时返回结果类型 */
declare type TAuthResult = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};
