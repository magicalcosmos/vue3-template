import { ProjectManagement } from '@/api';
import { TesterPath } from '@/router/paths';
import i18n from '@/i18n';
import { defineStore } from 'pinia';
import { NS } from './store-name';
import { AxiosError, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

export type TProject = {
  name?: string;
  url?: string;
  projectId?: string;
  lastVersion?: TObject;
};

export type TProjectState = {
  recentProjects?: Array<TProject>;
  mainPage?: string;
  licenseStatus?: boolean;
  compilationOptions?: TCompilationOption;
};

export const ProjectStore = defineStore(NS.PROJECT, {
  state: () => {
    return {
      recentProjects: [],
      mainPage: '',
      licenseStatus: false,
      compilationOptions: {},
    } as TProjectState;
  },
  getters: {},
  actions: {
    getCurrentProjects(callback?: Function) {
      ProjectManagement.list(
        {
          page: 1,
          perPage: 4,
          sortBy: 'visitAt',
          order: 'desc',
        },
        (error: AxiosError, data: AxiosResponse) => {
          if (error) {
            let message = '';
            if (error.response) {
              switch (error.response.status) {
                case 403:
                  message = 'message.not_tester';
                  break;
                case 404:
                  message = 'message.not_exits_or_not_owner';
                  break;
                case 409:
                  message = 'message.file_exist';
                  break;
                default:
                  message = 'message.500';
              }
            }
            ElMessage.error(message ? i18n.global.t(message) : error.message);
          } else {
            this.recentProjects = [];
            const tempData = data.data;
            if (tempData) {
              const projectList = tempData.projects;
              for (let i = 0; i < projectList.length; ++i) {
                this.recentProjects.push({
                  name: projectList[i].projectName,
                  url: TesterPath.VersionList.replace(':projectId', projectList[i].projectId),
                  projectId: projectList[i].projectId,
                  lastVersion: projectList[i].lastVersion || {},
                } as TProject);
              }
            }
            callback && callback();
          }
        },
      );
    },
    setConfigStatus(project: TProjectState) {
      this.licenseStatus = project.licenseStatus as boolean;
    },
    setCompilationOptions(data: TCompilationOption) {
      this.compilationOptions = data;
    },
  },
});
