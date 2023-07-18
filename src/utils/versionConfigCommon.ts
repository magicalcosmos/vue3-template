import { DetectionTemplateManagement, TesterCompileEnvManagement } from '@/api';
import common from '@/utils/common';
import vue from 'vue';
import { CODE_LANGUAGE, TEST_CASE_KIND } from '@/utils/dict';

class VersionConfigCommon {
  /**
   * 获取文件后缀
   * @date 2021-09-27
   * @param {String} value 文件后缀，如.h .c .cpp
   * @return {Array} 返回包含文件后缀的数组，当文件后缀不存在时， 返回[]空数组
   */
  getSuffixes(value: string, split = ';') {
    return common.stringSplit(value, split);
  }
  /**
   * assemble config data
   * @date 2021-09-27
   * @param {any} data 项目配置信息
   * @param {VueComponent} thisObject 组件实例对象
   * @param {Function} callback? 回调函数
   * @update 2021-09-27 修改文件后缀，
   * @return {any}
   */
  assembleData(data, thisObject: any, callback?: Function) {
    // data.headers = thisObject.headersString.suffixes.split(';');
    // data.languages = thisObject.languagesString.suffixes.split(';');
    // 头文件后缀
    const headerSuffixes = this.getSuffixes(thisObject.headersString);
    // C源文件后缀
    const CSourceSuffixes = this.getSuffixes(thisObject.languagesString);
    // C++源文件后缀
    const CPPSourceSuffixes = this.getSuffixes(thisObject.cAddLanguagesString);

    vue.set(data.unitTest, 'coverages', this.formatCoverage(thisObject.unitCoverages));
    vue.set(data.integrationTest, 'coverages', this.formatCoverage(thisObject.integrationCoverages));
    data.includes = this.getSuffixes(thisObject.includesString);
    data.macros = common.stringSplitToKVArray(thisObject.marcosString);
    // 2021-11-22 其他配置
    vue.set(data, 'arguments', common.stringSplit(thisObject.argumentsString, ' '));
    data.exits = this.getSuffixes(thisObject.exitsString);
    if (!data.environmentId) {
      vue.delete(data, 'environmentId');
    }
    vue.set(data, 'headers', { suffixes: headerSuffixes });
    if (data.language === CODE_LANGUAGE['C']) {
      vue.set(data, 'languages', {
        [CODE_LANGUAGE['C']]: { standard: thisObject.languagesStandardsString, suffixes: CSourceSuffixes },
      });
    } else if (data.language === CODE_LANGUAGE['CPP']) {
      vue.set(data, 'languages', {
        [CODE_LANGUAGE['C']]: { standard: thisObject.languagesStandardsString, suffixes: CSourceSuffixes },
        [CODE_LANGUAGE['CPP']]: {
          standard: thisObject.cAddLanguagesStandardsString,
          suffixes: CPPSourceSuffixes,
        },
      });
    }

    if (thisObject.$refs.unitTimeout) {
      const unitTimeout = thisObject.$refs.unitTimeout.getValue();
      vue.set(data.unitTest, 'timeoutTestGen', unitTimeout.generatedSecond);
      vue.set(data.unitTest, 'timeoutTestRun', unitTimeout.executedSecond);
    }
    if (thisObject.$refs.integrationTimeout) {
      const integrationTimeout = thisObject.$refs.integrationTimeout.getValue();
      vue.set(data.integrationTest, 'timeoutTestRun', integrationTimeout.executedSecond);
    }

    callback && callback();
  }

  /**
   * 兼容未区分功能模块的版本
   */
  compatibleOriginConfig(dataKey, data, thisObject: any) {
    if (!data.hasOwnProperty('staticAnalyze')) {
      if (data.analyzeTemplate) {
        if (thisObject.staticTem && thisObject.staticTem.length) {
          const staticTemMatch = thisObject.staticTem.filter(tem => tem.value === data.analyzeTemplate);
          if (staticTemMatch && staticTemMatch.length) {
            thisObject[dataKey].staticAnalyze = {
              analyzeTemplate: data.analyzeTemplate,
            };
          }
        }
      }
    }
    if (!data.hasOwnProperty('unitTest')) {
      thisObject[dataKey].unitTest = {};
      if (data.hasOwnProperty('strictOutputCheck'))
        thisObject[dataKey].unitTest.strictOutputCheck = data.strictOutputCheck;
      if (data.hasOwnProperty('integrateStdLib')) thisObject[dataKey].unitTest.integrateStdLib = data.integrateStdLib;
      if (data.hasOwnProperty('timeoutTestGen')) thisObject[dataKey].unitTest.timeoutTestGen = data.timeoutTestGen;
      if (data.hasOwnProperty('timeoutTestRun')) thisObject[dataKey].unitTest.timeoutTestRun = data.timeoutTestRun;
      if (data.hasOwnProperty('coverages')) {
        thisObject[dataKey].unitTest.coverages = common.coveragesNumberToArray(data.coverages);
        thisObject.unitCoverages = common.coveragesNumberToArray(data.coverages);
      }
    } else {
      thisObject.unitCoverages = common.coveragesNumberToArray(data.unitTest.coverages);
    }
    if (data.hasOwnProperty('integrationTest')) {
      thisObject.integrationCoverages = common.coveragesNumberToArray(data.integrationTest.coverages);
    }
  }
  /**
   * 处理导入的数据
   */
  dealData(dataKey: string, data, thisObject: any) {
    data = JSON.parse(data);
    delete data.fileId;
    delete data.versionName;
    delete data.rootDirectory;

    data.versionId = thisObject.getVersionId();
    this.splitConfigData(dataKey, data, thisObject);
    this.compatibleOriginConfig(dataKey, data, thisObject);
  }
  /**
   * 导入配置
   */
  importFile(thisObject: any) {
    const obj = thisObject.imFile;
    if (!obj.files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      thisObject.dealData(data); // analyzeData: 解析导入数据
      const configUpload: any = thisObject.$refs.configUpload;
      configUpload.value = '';
    };
    const f = obj.files[0];
    reader.readAsBinaryString(f);
  }
  /**
   * 点击导入
   */
  importJson(thisObject: any) {
    thisObject.imFile = document.getElementById('imFile');
    thisObject.imFile.click();
  }
  /**
   * 导出配置
   */
  exportJson(json, name, thisObject: any) {
    thisObject.outFile = document.getElementById('downLink');
    if (!json) {
      return;
    }
    let data = JSON.parse(JSON.stringify(json));
    this.assembleData(data, thisObject);

    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4);
    }
    const tmpDown: any = new Blob([data], { type: 'text/json' }); // 创建二进制对象写入转换好的字节流
    const href = URL.createObjectURL(tmpDown); // 创建对象超链接
    thisObject.outFile.download = `${name}.json`; // 下载名称
    thisObject.outFile.href = href; // 绑定a标签
    thisObject.outFile.click(); // 模拟点击实现下载
    setTimeout(() => {
      // 延时释放
      URL.revokeObjectURL(tmpDown); // 用URL.revokeObjectURL()来释放这个object URL
    }, 100);
  }
  /**
   * 覆盖率加上异常类型
   */
  formatCoverage(coverages) {
    let coverage = 0;
    if (coverages && coverages.length) {
      coverages.forEach(element => {
        coverage += element;
      });
    }
    // coverage = coverage | TEST_CASE_KIND.COVERAGE_CALC_PARAM;
    return coverage;
  }
  /**
   * 复选框checkbox
   */
  checkCoverage(value, key, thisObject: any) {
    const obj = thisObject[key];
    if (!obj.length) {
      return false;
    }
    if (obj.indexOf(value) === -1) {
      obj.push(value);
    } else {
      if (obj.length > 1) {
        obj.splice(obj.indexOf(value), 1);
      }
    }
  }
  /**
   * 是否显示Dialog
   */
  isShowDialog(target, status, thisObject: any) {
    if (target === 'includes') {
      // 包含目录
      const newIncludes = thisObject.includesString.split(';');
      if (newIncludes) {
        thisObject.version.includes = newIncludes;
      }
      thisObject.includeDirDialogVisible = !!status;
      thisObject.keyIncludeDirs = +new Date();
    } else if (target === 'macros') {
      // 宏定义
      const newMacros = common.stringSplitToKVArray(thisObject.marcosString);
      thisObject.version.macros = newMacros;
      thisObject.macroDialogVisible = !!status;
      thisObject.keyMacroDefs = +new Date();
    } else if (target === 'environmentIncludes') {
      // 编译环境包含目录
      thisObject.compilerEnvDialogVisible = !!status;
      thisObject.keyIncludesCompilerEenvironment = +new Date();
    } else if (target === 'otherConfiguration') {
      thisObject.version.arguments = common.stringSplit(thisObject.argumentsString, ' ');
      // 其他配置
      thisObject.otherConfigDialogVisible = !!status;
      thisObject.keyOtherConfiguration = +new Date();
    }
  }

  /**
   * 处理包含目录输入框显示内容
   */
  handleMacros(macros: Array<any>) {
    let macrosString = '';
    for (let i = 0; i < macros.length; ++i) {
      if (macros[i].value !== undefined) {
        macrosString += `${macros[i].key}=${macros[i].value};`;
      } else {
        macrosString += `${macros[i].key}=;`;
      }
    }
    return macrosString;
  }
  /**
   * 拆分配置数据
   */
  splitConfigData(dataKey: string, tempData, thisObject: any) {
    thisObject.includesString = tempData.includes.join(';');
    thisObject.headersString = tempData.headers.suffixes.join(';');
    if (tempData.language === CODE_LANGUAGE['C']) {
      thisObject.languagesString = tempData.languages[tempData.language].suffixes.join(';');
      thisObject.languagesStandardsString = tempData.languages[tempData.language].standard;
    } else if (tempData.language === CODE_LANGUAGE['CPP']) {
      thisObject.cAddLanguagesString =
        tempData.languages[tempData.language] !== undefined
          ? tempData.languages[tempData.language].suffixes.join(';')
          : '';
      thisObject.cAddLanguagesStandardsString =
        tempData.languages[tempData.language] !== undefined ? tempData.languages[tempData.language].standard : '';
      thisObject.languagesString =
        tempData.languages[CODE_LANGUAGE['C']] !== undefined
          ? tempData.languages[CODE_LANGUAGE['C']].suffixes.join(';')
          : '';
      thisObject.languagesStandardsString =
        tempData.languages[CODE_LANGUAGE['C']] !== undefined ? tempData.languages[CODE_LANGUAGE['C']].standard : '';
    }
    thisObject.marcosString = this.handleMacros(tempData.macros);
    thisObject.exitsString = (tempData.exits || []).join(';');
    // 其他配置
    thisObject.argumentsString = (tempData.arguments || []).join(' ');
    if (tempData.hasOwnProperty('unitTest')) {
      if (tempData.unitTest.coverages) {
        thisObject.unitCoverages = common.coveragesNumberToArray(tempData.unitTest.coverages);
      }
    }
    if (tempData.hasOwnProperty('integrationTest')) {
      if (tempData.integrationTest.coverages) {
        thisObject.integrationCoverages = common.coveragesNumberToArray(tempData.integrationTest.coverages);
      }
    }

    // 匹配静态分析模板
    if (tempData.hasOwnProperty('staticAnalyze')) {
      if (tempData.staticAnalyze.analyzeTemplate) {
        if (thisObject.staticTem && thisObject.staticTem.length) {
          const staticTemMatch = thisObject.staticTem.filter(
            tem => tem.value === tempData.staticAnalyze.analyzeTemplate,
          );
          if (staticTemMatch && staticTemMatch.length) {
            thisObject[dataKey].staticAnalyze.analyzeTemplate = tempData.staticAnalyze.analyzeTemplate;
          }
        }
      }
    }

    // 匹配编译环境
    if (tempData.environmentId) {
      if (thisObject.systemList && thisObject.systemList.length) {
        const systemMatch = thisObject.systemList.filter(tem => tem.value === tempData.environmentId);
        if (systemMatch && systemMatch.length) {
          thisObject[dataKey].environmentId = tempData.environmentId;
        }
      }
    }

    if (!thisObject.includesString) {
      thisObject.includesString = './';
      thisObject[dataKey].includes = ['./'];
    }
  }

  /**
   * 获取编译环境
   */
  getEnvironmentList(thisObject: any) {
    TesterCompileEnvManagement.list(
      {
        page: 1,
        perPage: 10000,
      },
      (error: any, data: any) => {
        if (error) {
          if (error.response) {
          }
        } else {
          const newData = data.data;
          thisObject.systemList = [{ label: 'default', value: '' }];
          newData.environments &&
            newData.environments.forEach(el => {
              thisObject.systemList.push({
                label: el.environmentName,
                value: el.environmentId,
              });
            });
        }
      },
    );
  }
  /**
   * 获取静态分析模板
   */
  getStaticTemList(thisObject: any) {
    thisObject.staticTem = [];
    DetectionTemplateManagement.list(
      {
        page: 1,
        perPage: 10000,
      },
      (error: any, data: any) => {
        if (error) {
          if (error.response) {
          }
        } else {
          const newData = data.data;
          newData.templates &&
            newData.templates.forEach(el => {
              thisObject.staticTem.push({
                label: el.name,
                value: el.templateId,
              });
            });
        }
      },
    );
  }
}

const versionConfigCommon = new VersionConfigCommon();

export default versionConfigCommon;
