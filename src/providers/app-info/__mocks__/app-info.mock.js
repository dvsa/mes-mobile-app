import { of } from 'rxjs';
var AppInfoProviderMock = /** @class */ (function () {
    function AppInfoProviderMock() {
        this.getVersionNumber = jasmine.createSpy('getVersionNumber').and.returnValue(of('1.0.0'));
        this.getMajorAndMinorVersionNumber = jasmine.createSpy('getMajorAndMinorVersionNumber').and.returnValue(Promise.resolve(1.0));
    }
    return AppInfoProviderMock;
}());
export { AppInfoProviderMock };
//# sourceMappingURL=app-info.mock.js.map