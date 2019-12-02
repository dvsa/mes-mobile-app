import { TestBed } from '@angular/core/testing';
import { CompressionProvider } from '../compression';
import { gzipSync } from 'zlib';
import { categoryBTestResultMock } from '../../../shared/mocks/cat-b-test-result.mock';
import { configureTestSuite } from 'ng-bullet';

describe('Compression Provider', () => {

  let compressionProvider: CompressionProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        CompressionProvider,
      ],
    });
  });

  beforeEach(() => {
    compressionProvider = TestBed.get(CompressionProvider);
  });

  describe('extractTestResult', () => {
    it('should correctly decompress a cat b test result', () => {
      const compressedData = gzipSync(JSON.stringify(categoryBTestResultMock)).toString('base64');
      const result = compressionProvider.extractTestResult(compressedData);
      expect(result).toEqual(categoryBTestResultMock);
    });
  });
});
