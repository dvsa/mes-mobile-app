import { categoryBTestResultMock } from '../../../shared/mocks/cat-b-test-result.mock';

export class CompressionProviderMock {

  constructor() {}

  extractCatBTestResult =
    jasmine.createSpy('extractCatBTestResult').and.returnValue(categoryBTestResultMock);

}
