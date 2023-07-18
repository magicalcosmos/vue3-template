const popperMap = {}; //  save target from invoker, in order to achieve setTimeout
/**
 * this is for select popper addEventListener and removeEventListener
 */
class Popper {
  private selector: any;
  private callback: Function;
  private timeout = 0;
  private target: any;
  constructor(selector: any, callback: Function) {
    this.selector = selector;
    this.callback = callback;
  }
  /**
   * get style computed property
   * @param { element }
   * @param { property }
   */
  getStyleComputedProperty(element: Element, property: any) {
    // NOTE: 1 DOM access here
    const css = window.getComputedStyle(element, null);
    return css[property];
  }
  /**
   * Get parent element
   * @param element
   */
  getScrollParent(element: any) {
    const root: any = window;
    const parent: any = element.parentNode;
    if (!parent) {
      return element;
    }
    if (parent === root.document) {
      // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
      // greater than 0 and return the proper element
      if (root.document.body.scrollTop || root.document.body.scrollLeft) {
        return root.document.body;
      } else {
        return root.document.documentElement;
      }
    }
    // Firefox want us to check `-x` and `-y` variations as well
    if (
      ['scroll', 'auto'].indexOf(this.getStyleComputedProperty(parent, 'overflow')) !== -1 ||
      ['scroll', 'auto'].indexOf(this.getStyleComputedProperty(parent, 'overflow-x')) !== -1 ||
      ['scroll', 'auto'].indexOf(this.getStyleComputedProperty(parent, 'overflow-y')) !== -1
    ) {
      // If the detected scrollParent is body, we perform an additional check on its parentNode
      // in this way we'll get body if the browser is Chrome-ish, or documentElement otherwise
      // fixes issue #65
      return parent;
    }
    return this.getScrollParent(element.parentNode);
  }
  /**
   * scroll event
   * @param event
   */
  scrollEvents(evt: any) {
    const thisObj = popperMap[evt.target];
    if (thisObj) {
      thisObj.timeout && clearTimeout(thisObj.timeout);
      thisObj.timeout = setTimeout(() => {
        thisObj.callback && thisObj.callback();
      }, 16);
    }
  }
  // Add scroll event
  addScrollEvent() {
    if (typeof this.selector === 'string') {
      this.target = document.querySelector(this.selector);
    } else {
      this.target = this.getScrollParent(this.selector);
    }
    popperMap[this.target] = this;
    // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
    this.target && this.target.addEventListener('scroll', this.scrollEvents, false);
  }
  // Remove scroll event
  removeScrollEvent() {
    if (this.target) {
      this.target.removeEventListener('scroll', this.scrollEvents, false);
      delete popperMap[this.target];
    }
  }
}
export default Popper;
