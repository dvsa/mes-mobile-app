export class DataStoreProviderMock {

    // isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);

    // getAuthenticationToken = jasmine.createSpy('getAuthenticationToken').and.returnValue(Promise.resolve('token'));

    // getEmployeeId = jasmine.createSpy('getEmployeeId').and.returnValue('12345678');

    // login = jasmine.createSpy('login').and.returnValue(Promise.resolve());

    // logout = jasmine.createSpy('logout').and.returnValue(Promise.resolve());
  setItem = jasmine.createSpy('setItem').and.returnValue('set');
  getItem = jasmine.createSpy('getItem').and.returnValue('get');
  setSecureContainer = jasmine.createSpy('setSecureContainer').and.returnValue(Promise.resolve());
}
