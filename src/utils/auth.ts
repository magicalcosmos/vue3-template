import Cookies from 'js-cookie';
import { LOGIN } from './dict';

export function getUsername() {
  return getCookie(LOGIN.USERNAME);
}

export function setUsername(username) {
  const curDate = new Date();
  curDate.setHours(curDate.getHours() + 1);
  Cookies.set(LOGIN.SESSIONID, getSID(), { expires: curDate, path: '/' });
  return Cookies.set(LOGIN.USERNAME, username, { expires: curDate, path: '/' });
}

export function removeUsername() {
  return Cookies.remove(LOGIN.USERNAME, { path: '/' });
}

export function removeSID() {
  return Cookies.remove(LOGIN.SESSIONID, { path: '/' });
}

export function getSID() {
  return getCookie(LOGIN.SESSIONID);
}

export function getCookie(cookieName) {
  const cookies = document.cookie;
  if (!cookies) {
    return '';
  } else {
    const cookieArray = cookies.split(';');
    let i;
    for (i = 0; i < cookieArray.length; i++) {
      if (cookieArray[i]) {
        const cookie = cookieArray[i].split('=');
        if (cookie[0].replace(/^\s+|\s+$/g, '') === cookieName) {
          return cookie[1] || '';
        }
      }
    }
  }
  return '';
}
export function getLang() {
  return Cookies.get(LOGIN.LANG);
}

export function setLang(lang) {
  return Cookies.set(LOGIN.LANG, lang, { path: '/' });
}

export function updateCookie() {
  const curDate = new Date();
  curDate.setHours(curDate.getHours() + 1);
  const expiresTime = { expires: curDate, path: '/' };
  const sid = getSID();
  const username = getUsername();
  const lang = getLang();
  sid && Cookies.set(LOGIN.SESSIONID, sid, expiresTime);
  username && Cookies.set(LOGIN.USERNAME, username, expiresTime);
  lang && Cookies.set(LOGIN.LANG, lang, expiresTime);
}

export function formatLang(lang) {
  return lang.replace('-', '_');
}
