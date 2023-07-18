import {} from '@/utils/dict';
import { UserStore, LicenseStore } from '@/store';
import { VNode } from 'vue';
const auth = {
  mounted(el: Node, bindings: TTObject<string>, vnode: VNode) {
    const userStore = UserStore();
    const licenseStore = LicenseStore();
    const value = bindings.value;
    const privilege: any = userStore.privilege;
    let isShow = privilege[value];
    const license = licenseStore.license?.license;
    const modules = license && license.modules;
    let elArray;
    if (value.indexOf('_') !== -1) {
      elArray = value.split('_');
      let mod = null;
      if (elArray.length === 3) {
        isShow = privilege[elArray[0]] || privilege[elArray[1]];
        mod = elArray[2];
      } else if (elArray.length > 0) {
        isShow = privilege[elArray[0]];
        mod = elArray[1];
      }
      if (modules && mod && (!modules[mod] || modules[mod].status === undefined)) {
        isShow = false;
      }
      // no license
      if (license === undefined) {
        isShow = false;
      }
    } else if (value.indexOf('&') !== -1) {
      elArray = value.split('&');
      if (elArray.length === 2) {
        isShow = isShow = privilege[elArray[0]] || privilege[elArray[1]];
      }
    }
    !isShow && el.parentNode?.removeChild(el);
  },
};
export default auth;
