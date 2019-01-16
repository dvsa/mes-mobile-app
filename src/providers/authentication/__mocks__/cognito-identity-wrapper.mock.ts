import { CredentialsOptions } from 'aws-sdk/lib/credentials';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class CognitoIdentityWrapperMock {

  constructor() {};

  getCredentials(): Observable<CredentialsOptions> {
    return of({
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey',
      sessionToken: 'sessionToken'
    });
  }

  createIdentity() {
    return {
      getPromise: jest.fn().mockResolvedValue(1)
    }
  }

}
