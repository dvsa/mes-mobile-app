import { Observable } from 'rxjs';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

export class InAppBrowserMock {

  create(url: string, target: string, options: string) {
    return new InAppBrowserObjectMock();
  }
}

export class InAppBrowserObjectMock {

  show(): void {}

  close(): void { }

  hide(): void { }

  executeScript(script: object): Promise<any> {
    return new Promise((resolve) => { });
  }

  insertCSS(css: object): Promise<any> {
    return new Promise((resolve) => { });
  }

  on(event: string): Observable<InAppBrowserEventMock> {
    return new EmptyObservable();
  }
}

export class InAppBrowserEventMock {

  type: string = 'type';
  url: string = 'url';
  code: number = 123;
  message: string = 'message';
}
