import { defineStore } from 'pinia';
import { NS } from './store-name';

const key = 'isCloseTips';

export type TLicenseState = {
  license?: TLicenseResult;
  closeTips?: number;
};

export const LicenseStore = defineStore(NS.LICENSE, {
  state: () => {
    return {
      license: {},
      closeTips: parseInt(localStorage.getItem(key) as string),
    } as TLicenseState;
  },
  getters: {},
  actions: {
    setCloseTips(license: TLicenseState) {
      this.closeTips = license.closeTips;
      localStorage.setItem(key, (license.closeTips as number).toString());
    },

    removeCloseTips() {
      localStorage.removeItem(key);
      this.closeTips = parseInt(localStorage.getItem(key) as string);
    },

    setLicenseStatus(license: TLicenseResult) {
      this.license = license;
    },
  },
});
