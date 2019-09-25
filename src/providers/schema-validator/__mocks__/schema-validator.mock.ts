import { ValidationResult } from '@hapi/joi';

export class SchemaValidatorProviderMock {
  validateRemoteConfig = (data: any): ValidationResult<any> => {
    return {
      error: null,
      value: {},
      then: jasmine.createSpy('then', () => {}),
      catch: jasmine.createSpy('catch', () => {}),
    };
  }
}
