export class ToastControllerMock {
  constructor() { }

  create(attr: object): any {
    return {
      present: () => {},
    };
  }
}
