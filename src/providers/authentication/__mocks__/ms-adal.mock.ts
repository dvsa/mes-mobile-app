export class MSAdalMock {

  createAuthenticationContext(context: string) {
    return new AuthenticationContextMock;
  }
}

export class AuthenticationContextMock {

  tokenCache = new TokenCacheMock();

  acquireTokenSilentAsync(resourceUrl: string, clientId: string, emptyString: string) {
    return new Promise((resolve, reject) => {
      resolve({
        accessToken: 'U0lMRU5UIEFZU05DIFRFU1QgVE9LRU4'
      });
    })
  }

  acquireTokenAsync(
    resourceUrl: string,
    clientId: string,
    redirectUrl: string,
    emptyString1: string,
    emptyString2: string
  ) {
    return new Promise((resolve, reject) => {
      resolve({
        accessToken: 'QVlTTkMgVEVTVCBUT0tFTg=='
      });
    });
  }
}

export class TokenCacheMock {

  clear() {

  }
}
