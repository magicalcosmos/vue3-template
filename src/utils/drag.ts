/**
 * @deprecated 废弃，使用v-drag指令代替
 */
class Drag {
  private el: any;
  private callback: any;
  constructor(el, callback) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el;
    this.callback = callback;
    if (this.el) {
      this.handleBind();
    }
  }
  handleBind() {
    let disX = 0;
    let disY = 0;
    let isDrag = false;
    let firstTime: number;
    let lastTime: number;
    this.el.onmousedown = evt => {
      evt = evt || window.event;
      firstTime = Date.now();
      isDrag = true;

      disX = evt.clientX - this.el.offsetLeft;
      disY = evt.clientY - this.el.offsetTop;
      if (evt.preventDefault()) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
      //this.setCapture && this.setCapture();
      document.onmousemove = evt => {
        const event: any = evt || window.event;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (
          event.clientY < 0 ||
          event.clientX < 0 ||
          event.clientY > window.innerHeight ||
          event.clientX > document.documentElement.clientWidth
        ) {
          return false;
        }
        this.el.style.left = event.clientX - disX + 'px';
        this.el.style.top = event.clientY - disY + 'px';
      };
      return false;
    };
    this.el.onmouseup =
      window.onblur =
      this.el.onlosecapture =
        evt => {
          document.onmousemove = null;
          lastTime = Date.now();
          if (lastTime - firstTime < 200) {
            this.callback && this.callback();
          }
        };
  }
}
export default Drag;
