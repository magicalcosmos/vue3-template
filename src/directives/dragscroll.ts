/**
 * 拖拽滚动指令
 * @example
 *  <div v-dragscroll></div>
 *  <div v-dragscroll="{ direction: 'both' }"></div>
 *  <div v-dragscroll="{ direction: 'vertical' }"></div>
 *  <div v-dragscroll="{ direction: 'horizontal' }"></div>
 */
const dragscroll = {
  mounted(el, bindings, vnode) {
    el.onmousedown = function (ev) {
      const disX = ev.clientX;
      const disY = ev.clientY;
      const value = bindings.value || { direction: 'horizontal' }; // 默认horizontal
      const originalScrollLeft = el.scrollLeft;
      const originalScrollTop = el.scrollTop;
      const originalScrollBehavior = el.style['scroll-behavior'];
      const originalPointerEvents = el.style['pointer-events'];
      el.style['scroll-behavior'] = 'auto';
      // 鼠标移动事件是监听的整个document，这样可以使鼠标能够在元素外部移动的时候也能实现拖动
      document.onmousemove = function (ev) {
        // ev.preventDefault();
        const distanceX = ev.clientX - disX;
        const distanceY = ev.clientY - disY;
        el.scrollTo(originalScrollLeft - distanceX, originalScrollTop - distanceY);
        dragscroll.setScroll(el, value.direction, originalScrollLeft - distanceX, originalScrollTop - distanceY);
        // 鼠标拖动的时候将点击事件屏蔽掉
        el.style['pointer-events'] = 'none';
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
        el.style['scroll-behavior'] = originalScrollBehavior;
        el.style['pointer-events'] = originalPointerEvents;
      };
    };
  },
  setScroll(el, direction, sx, sy) {
    let x = 0;
    let y = 0;
    if (direction === 'both') {
      x = sx;
      y = sy;
    } else if (direction === 'vertical') {
      y = sy;
    } else if (direction === 'horizontal') {
      x = sx;
    }
    el.scrollTo(x, y);
  },
};
export default dragscroll;
