import { TestBed } from '@angular/core/testing';
import { CompressionProvider } from '../compression';
import { gzipSync } from 'zlib';
import { categoryBTestResultMock } from '../../../shared/mocks/cat-b-test-result.mock';

describe('Compression Provider', () => {

  let compressionProvider: CompressionProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompressionProvider,
      ],
    });

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
