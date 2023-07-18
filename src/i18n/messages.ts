import zhLocale from './zh-CN';
import enLocale from './en-US';
import jaLocale from './ja-JP';

import { merge } from 'webpack-merge';
import { zhCn, en, ja, TranslatePair } from './lib/locale';

const messages = {
  zh_CN: merge(zhCn, zhLocale),
  en_US: merge(en, enLocale),
  ja_JP: merge(ja, jaLocale),
};

export default messages;
