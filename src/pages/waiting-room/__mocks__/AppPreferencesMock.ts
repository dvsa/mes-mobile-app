export class AppPreferencesMock {

  fetch = jasmine.createSpy('fetch').and.returnValue(Promise.resolve('value'));
}
