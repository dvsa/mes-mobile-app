export class AppPreferencesMock {

  fetch = jasmine.createSpy('fetch').and.returnValues(
    Promise.resolve('configUrl'),
    Promise.resolve('authenticationContext'),
    Promise.resolve('resourceUrl'),
    Promise.resolve('clientId'),
    Promise.resolve('redirectUrl'),
    Promise.resolve('logoutUrl'),
    Promise.resolve('employeeIdKey'),
    );
}
