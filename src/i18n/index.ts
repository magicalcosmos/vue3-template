/** ElementUI Plus Supported Language List
Simplified Chinese (zh-cn)
American English (en)
Azerbaijani (az)
German (de)
Portuguese (pt)
Spanish (es)
Danish (da)
French (fr)
Norwegian (nb-NO)
Traditional Chinese (zh-tw)
Italian (it)
Korean (ko)
Japanese (ja)
Dutch (nl)
Vietnamese (vi)
Russian (ru)
Turkish (tr)
Brazilian Portuguese (pt-br)
Farsi (fa)
Thai (th)
Indonesian (id)
Bulgarian (bg)
Pashto (pa)
Polish (pl)
Finnish (fi)
Swedish (sv)
Greek (el)
Slovak (sk)
Catalunya (ca)
Czech (cs)
Ukrainian (uk)
Turkmen (tk)
Tamil (ta)
Latvian (lv)
Afrikaans (af)
Estonian (et)
Slovenian (sl)
Arabic (ar)
Hebrew (he)
Lithuanian (lt)
Mongolian (mn)
Kazakh (kk)
Hungarian (hu)
Romanian (ro)
Kurdish (ku)
Uighur (ug-cn)
Khmer (km)
Serbian (sr)
Basque (eu)
Kyrgyz (ky)
Armenian (hy-am)
Croatian (hr)
Esperanto (eo)
Bengali (bn)
 */
import { createI18n } from 'vue-i18n';

import { TranslatePair } from './lib/locale';
import { getLang } from '../utils/auth';
import { getTimezoneName } from '../utils/time';

import messages from './messages';

const lang: string = getLang() ? getLang() : getTimezoneName();

export const locale = (messages as TranslatePair)[`${lang}`];
const i18n = createI18n({
  legacy: false,
  locale: 'zh_CN',
  fallbackLocale: 'zh_CN',
  globalInjection: true,
  messages,
});
export default i18n;
