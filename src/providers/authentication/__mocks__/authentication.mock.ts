export class AuthenticationProviderMock {

  isAuthenticated() : boolean {
    return true;
  }

  getAuthenticationToken() : string {
    return 'token';
  }

  login(): void { }

  logout(): void { }

}
