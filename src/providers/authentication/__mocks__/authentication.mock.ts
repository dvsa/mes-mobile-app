export class AuthenticationProviderMock {

  isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);

  getAuthenticationToken = jasmine.createSpy('getAuthenticationToken').and.returnValue('token');

  getEmployeeId = jasmine.createSpy('getEmployeeId').and.returnValue('12345678');

  login = jasmine.createSpy('login').and.returnValue(new Promise(() => { }));

  loginWithCredentials = jasmine.createSpy('loginWithCredentials').and.returnValue(new Promise(() => { }));

  logout = jasmine.createSpy('logout').and.returnValue(new Promise(() => { }));
}
