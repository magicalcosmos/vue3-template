import { defineStore } from 'pinia';
import { NS } from './store-name';
import Privilege from '@/service/privilege';
import { ROLES } from '@/utils/dict';

export type TPrivilege = {
  admin?: boolean;
  tester?: boolean;
  testerManager?: boolean;
};

export type TUserState = {
  userId: string;
  username: string;
  nickname: string;
  role: number;
  lang: string;
  privilege?: TPrivilege;
};

export const UserStore = defineStore(NS.USER, {
  state: () => {
    return {
      userId: '',
      username: '',
      nickname: '',
      role: 0,
      lang: '',
      privilege: {
        admin: false,
        tester: false,
        testerManager: false,
      } as TPrivilege,
    } as TUserState;
  },
  getters: {},
  actions: {
    setUserInfo(data: TUserState) {
      this.userId = data.userId;
      this.username = data.username;
      this.nickname = data.nickname;
      this.role = data.role;
      (this.privilege as TPrivilege).admin = Privilege.hasPrivilege([ROLES.SUPERADMIN, ROLES.ADMIN], data.role);
      (this.privilege as TPrivilege).tester = Privilege.hasPrivilege(ROLES.TESTER, data.role);
      (this.privilege as TPrivilege).testerManager = Privilege.hasPrivilege(ROLES.TESTERMANAGER, data.role);
      this.lang = data.lang && data.lang.replace('_', '-');
    },
    getUserInfo(): TUserState {
      return {
        userId: this.userId,
        username: this.username,
        nickname: this.nickname,
        role: this.role,
        lang: this.lang && this.lang.replace('_', '-'),
      };
    },
  },
});
