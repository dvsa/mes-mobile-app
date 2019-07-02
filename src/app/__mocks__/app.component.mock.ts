import { App } from '../app.component';

export class MockAppComponent extends App {
  getTextZoomClass() {
    return 'text-zoom-regular';
  }
}
