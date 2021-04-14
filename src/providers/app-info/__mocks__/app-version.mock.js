import { APP_VERSION_NUMBER } from '../__tests__/app-info.spec';
var AppVersionMock = /** @class */ (function () {
    function AppVersionMock() {
        this.getAppName = jasmine.createSpy('getAppName').and.returnValue(Promise.resolve('app name'));
        this.getPackageName = jasmine.createSpy('getPackageName').and.returnValue(Promise.resolve('package name'));
        this.getVersionCode = jasmine.createSpy('getVersionCode').and.returnValue(Promise.resolve('version code'));
        this.getVersionNumber = jasmine.createSpy('getVersionNumber').and.returnValue(Promise.resolve(APP_VERSION_NUMBER));
    }
    return AppVersionMock;
}());
export { AppVersionMock };
//# sourceMappingURL=app-version.mock.js.map