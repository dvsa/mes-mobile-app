import { SpeedCheckState } from '../test-report-validator.constants';
var TestReportValidatorProviderMock = /** @class */ (function () {
    function TestReportValidatorProviderMock() {
        this.isTestReportValid = jasmine.createSpy('isTestReportValid').and.returnValue(true);
        this.getMissingLegalRequirements = jasmine.createSpy('getMissingLegalRequirements').and.returnValue([]);
        this.isETAValid = jasmine.createSpy('isETAValid').and.returnValue(true);
        this.validateSpeedChecksCatAMod1 = jasmine.createSpy('validateSpeedChecksCatAMod1').and.returnValue(SpeedCheckState.VALID);
    }
    return TestReportValidatorProviderMock;
}());
export { TestReportValidatorProviderMock };
//# sourceMappingURL=test-report-validator.mock.js.map