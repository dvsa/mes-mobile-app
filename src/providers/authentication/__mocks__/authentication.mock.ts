export class AuthenticationProviderMock {

  isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);

  getAuthenticationToken = jasmine.createSpy('getAuthenticationToken').and.returnValue(Promise.resolve('token'));

  getEmployeeId = jasmine.createSpy('getEmployeeId').and.returnValue('12345678');

  login = jasmine.createSpy('login').and.returnValue(Promise.resolve());

  logout = jasmine.createSpy('logout').and.returnValue(Promise.resolve());
}
