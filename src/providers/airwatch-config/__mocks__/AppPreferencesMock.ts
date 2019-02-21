export class AppPreferencesMock {

  fetch = jasmine.createSpy('fetch').and.returnValues(
    Promise.resolve('configUrl'),
    );
}
