const onPopstate = () => window.history.pushState(null, '', document.URL);
const bindEvents = () => window.addEventListener('popstate', onPopstate);
const unbindEvents = () => window.removeEventListener('popstate', onPopstate);
/**
 * 禁止浏览器后退
 */
const preventBack = () => {
  onPopstate();
  bindEvents();
};
/**
 * 取消禁止浏览器后退
 */
const cancelPreventBack = () => unbindEvents();

export { preventBack, cancelPreventBack };
