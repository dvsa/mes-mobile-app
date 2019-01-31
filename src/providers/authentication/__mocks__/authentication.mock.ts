export class AuthenticationProviderMock {

  isAuthenticated = jasmine.createSpy().and.returnValue(true);

  getAuthenticationToken = jasmine.createSpy().and.returnValue('token');

  getEmployeeId = jasmine.createSpy().and.returnValue('12345678');

  login = jasmine.createSpy().and.returnValue(new Promise(() => { }));

  loginWithCredentials = jasmine.createSpy().and.returnValue(new Promise(() => { }));

  logout = jasmine.createSpy().and.returnValue(new Promise(() => { }));
}

