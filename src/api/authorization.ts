// 授权机制
import { sha256 } from '@/utils/sha256';
import Ajax from '@/utils/Ajax';
import { IUserInfo, IAjaxParams } from '@/interface';
import authURL from './urls';
class Authorization {
  /**
   * 获取token
   * @param userInfo
   * @param grantType
   */
  Login(userInfo: IUserInfo, callback?: Function, grantType?: string) {
    const ajaxParams: IAjaxParams<IUserInfo> = {
      url: authURL.token,
      params: {
        username: userInfo.username,
        password: sha256(userInfo.password),
        grantType: grantType || 'password',
      },
      callback: callback,
    };
    return Ajax.post(ajaxParams);
  }

  RefreshToken() {}
}
const authorization = new Authorization();
export default authorization;
