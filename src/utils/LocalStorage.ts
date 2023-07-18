import { IKV } from '@/interface';
import { common, Dict } from '.';
class LocalStorage {
  /**
   * 设置 localstorage
   * @param kv
   */
  set(kv: IKV) {
    window.localStorage.setItem(kv.key, kv.value);
  }
  /**
   * 根据key获取 localstorage
   * @param kv
   */
  get(key: string): string {
    return window.localStorage.getItem(key) || '';
  }
  /**
   * 从localStorage里获取token
   */
  getToken(): string {
    return this.get(Dict.LOGIN.TOKEN);
  }
  remove(key: string): void {
    window.localStorage.removeItem(key);
  }
  /**
   * 同步从localStorage里获取token
   */
  getTokenSync() {
    const that = this;
    return new Promise(function (resolve, reject) {
      const token = that.getToken();
      resolve(token);
      // if (token || window.location.href.indexOf('/login') !== -1) {
      //   resolve(token);
      // } else {
      //   reject(false);
      // }
    });
  }
  /**
   * 从localStorage里获取lang
   */
  getLang(): string {
    return this.get(Dict.LOGIN.LANG.replace('_', '-'));
  }
  /**
   * 存最新的测试主页选中节点id
   * @param id string
   * @param name string
   */
  setLastTestCaseFileTreeSelectId(versionId: string, id: string, name = '') {
    const selectIdObj = JSON.parse(
      this.get(`${common.currentTestType()}LastTestCaseFileTree${name}SelectNodeId`) || '{}',
    );
    selectIdObj[versionId] = id;
    this.set({
      key: `${common.currentTestType()}LastTestCaseFileTree${name}SelectNodeId`,
      value: JSON.stringify(selectIdObj),
    });
  }
  /**
   * 取最新的单元测试/集成测试选中节点id
   * @param versionId string
   * @param name string
   * @return id string
   */
  getLastTestCaseFileTreeSelectId(versionId: string, name = '') {
    const selectIdObj = JSON.parse(
      this.get(`${common.currentTestType()}LastTestCaseFileTree${name}SelectNodeId`) || '{}',
    );
    return selectIdObj[versionId] || '';
  }
  /**
   * 存最新的测试主页功能tab
   * 单元测试/集成测试为Number
   * 静态分析 string
   * @param versionId string
   * @param tab
   */
  setLastTestHomePageTab(versionId: string, tab) {
    const tabObj = JSON.parse(this.get(`${common.currentTestType()}LastTestHomePageTabName`) || '{}');
    tabObj[versionId] = tab;
    this.set({ key: `${common.currentTestType()}LastTestHomePageTabName`, value: JSON.stringify(tabObj) });
  }
  /**
   * 取最新的测试主页功能tab
   * 单元测试/集成测试为Number
   * 静态分析 string
   * @param versionId string
   * @return tab
   */
  getLastTestHomePageTab(versionId: string) {
    const tabObj = JSON.parse(this.get(`${common.currentTestType()}LastTestHomePageTabName`) || '{}');
    return tabObj[versionId] || '';
  }
}
export default new LocalStorage();
