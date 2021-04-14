import { categoryBTestResultMock } from '../../../shared/mocks/cat-b-test-result.mock';
import { bookedTestSlotMock } from '../../../shared/mocks/test-slot-data.mock';
var CompressionProviderMock = /** @class */ (function () {
    function CompressionProviderMock() {
        this.extractTestResult = jasmine.createSpy('extractTestResult').and.returnValue(categoryBTestResultMock);
    }
    CompressionProviderMock.prototype.extractTestSlotResult = function () {
        return bookedTestSlotMock;
    };
    return CompressionProviderMock;
}());
export { CompressionProviderMock };
//# sourceMappingURL=compression.mock.js.map