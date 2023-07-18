import Auth from './auth';
import Hide from './hide';
import Drag from './drag';
import DragScroll from './dragscroll';
import Focus from './focus';
import { App } from 'vue';

export default (app: App<Element>) => {
  app.directive('auth', Auth);
  app.directive('hide', Hide);
  app.directive('drag', Drag);
  app.directive('dragscroll', DragScroll);
  app.directive('focus', Focus);
};
