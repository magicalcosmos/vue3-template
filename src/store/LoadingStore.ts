import { defineStore } from 'pinia';
import { NS } from './store-name';
type TUpload = {
  isUploading?: boolean;
  handleCancel?: Function;
};
export type TLoadingState = {
  /** for loading or downloading */
  isLoading?: boolean;
  /** for uploading */
  upload?: TUpload;
};

export const LoadingStore = defineStore(NS.LOADING, {
  state: () => {
    return {
      isLoading: false,
      upload: {
        isUploading: false,
        handleCancel: () => {},
      },
    } as TLoadingState;
  },
  getters: {},
  actions: {
    setLoading(loading: TLoadingState): void {
      this.isLoading = loading.isLoading;
      this.upload = {
        isUploading: false,
        handleCancel: () => {},
      };
    },
    setUpLoading(uploading: TLoadingState): void {
      this.upload = uploading.upload;
      this.isLoading = false;
    },
  },
});
