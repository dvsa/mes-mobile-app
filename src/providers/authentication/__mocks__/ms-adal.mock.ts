export class MSAdalMock {

  createAuthenticationContext =
    jasmine.createSpy('createAuthenticationContext')
    .and
    .returnValue(new AuthenticationContextMock());
}

export class AuthenticationContextMock {

  tokenCache = new TokenCacheMock();

  acquireTokenSilentAsync =
    jasmine.createSpy('acquireTokenSilentAsync')
    .and
    .returnValue(Promise.resolve({ accessToken: 'U0lMRU5UIEFZU05DIFRFU1QgVE9LRU4' }));

  acquireTokenAsync =
    jasmine.createSpy('acquireTokenAsync')
    .and
    .returnValue(Promise.resolve({ accessToken: 'QVlTTkMgVEVTVCBUT0tFTg==' }));
}

export class TokenCacheMock {

  clear = jasmine.createSpy('clear');
}
