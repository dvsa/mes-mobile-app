import { TestBed } from '@angular/core/testing';
import { CompressionProvider } from '../compression';
import { gzipSync } from 'zlib';
import { categoryBTestResultMock } from '../../../shared/mocks/cat-b-test-result.mock';
import { configureTestSuite } from 'ng-bullet';
describe('Compression Provider', function () {
    var compressionProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                CompressionProvider,
            ],
        });
    });
    beforeEach(function () {
        compressionProvider = TestBed.get(CompressionProvider);
    });
    describe('extractTestResult', function () {
        it('should correctly decompress a cat b test result', function () {
            var compressedData = gzipSync(JSON.stringify(categoryBTestResultMock)).toString('base64');
            var result = compressionProvider.extractTestResult(compressedData);
            expect(result).toEqual(categoryBTestResultMock);
        });
    });
});
//# sourceMappingURL=compression.spec.js.map