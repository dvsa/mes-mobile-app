import { getVersionNumber, getEmployeeName } from '../app-info.selector';
describe('AppInfoSelector', function () {
    var state = {
        versionNumber: '1.0.0',
        employeeId: '1234567',
        employeeName: 'Fake Name',
    };
    describe('getVersionNumber', function () {
        it('should select version number from state', function () {
            var versionNumber = getVersionNumber(state);
            expect(versionNumber).toBe('1.0.0');
        });
    });
    describe('getEmployeeName', function () {
        it('should select the employee name from state', function () {
            var employeeName = getEmployeeName(state);
            expect(employeeName).toBe('Fake Name');
        });
    });
});
//# sourceMappingURL=app-info.selector.spec.js.map