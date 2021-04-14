import { ActivityCodes } from '../../../shared/models/activity-codes';
import { of } from 'rxjs';
var TestResultProviderMock = /** @class */ (function () {
    function TestResultProviderMock() {
        this.calculateCatBTestResult = jasmine.createSpy('calculateCatBTestResult').and.returnValue(ActivityCodes.PASS);
        this.calculateCatCPCTestResult = jasmine.createSpy('calculateCatCPCTestResult').and.returnValue(of(ActivityCodes.PASS));
        this.calculateTestResult = jasmine.createSpy('calculateCatCPCTestResult').and.returnValue(of(ActivityCodes.PASS));
    }
    return TestResultProviderMock;
}());
export { TestResultProviderMock };
//# sourceMappingURL=test-result.mock.js.map