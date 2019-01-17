export class AuthenticationProviderMock {

  isAuthenticated = jest.fn().mockReturnValue(true);

  getAuthenticationToken = jest.fn().mockReturnValue('token');

  getEmployeeId = jest.fn().mockReturnValue('12345678');

  login = jest.fn(() => {
    return new Promise(() => {});
  })

  loginWithCredentials = jest.fn(() => {
    return new Promise(() => {});
  })

  logout =  jest.fn(() => {
    return new Promise(() => { });
  })

}
