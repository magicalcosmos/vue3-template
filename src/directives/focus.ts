/**
 * r-input文本框自动获取焦点
 */
const focus = {
  mounted(el, bindings, vnode) {
    const inputEl = el.querySelector('input');
    if (inputEl) {
      inputEl.focus();
    }
  },
};
export default focus;
