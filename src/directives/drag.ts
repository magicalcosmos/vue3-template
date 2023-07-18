/**
 * 拖拽指令
 * @example
 *  <div v-drag></div>
 */
const drag = {
  mounted(el: HTMLElement) {
    el.onmousedown = (ev: MouseEvent) => {
      // X轴最小偏移量
      const minOffsetX = 0;
      // Y轴最小偏移量
      const minOffsetY = 0;
      // X轴最大偏移量
      const maxOffsetX = document.documentElement.clientWidth - el.offsetWidth;
      // Y轴最大偏移量
      const maxOffsetY = document.documentElement.clientHeight - el.offsetHeight;
      const disX = ev.clientX - el.offsetLeft;
      const disY = ev.clientY - el.offsetTop;
      const originalPointerEvents = el.style.pointerEvents;
      if (ev.preventDefault) {
        ev.preventDefault();
      } else {
        ev.returnValue = false;
      }
      // 鼠标移动事件是监听的整个document，这样可以使鼠标能够在元素外部移动的时候也能实现拖动
      document.onmousemove = (ev: MouseEvent) => {
        let x = ev.clientX - disX;
        let y = ev.clientY - disY;

        x = Math.min(Math.max(x, minOffsetX), maxOffsetX);
        y = Math.min(Math.max(y, minOffsetY), maxOffsetY);

        el.style.left = x + 'px';
        el.style.top = y + 'px';
        // 鼠标拖动的时候将点击事件屏蔽掉
        el.style.pointerEvents = 'none';
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        el.style.pointerEvents = originalPointerEvents;
      };
    };
  },
};
export default drag;
