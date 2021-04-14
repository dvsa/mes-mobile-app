var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { initialState, appInfoReducer } from '../app-info.reducer';
import * as appInfoActions from '../app-info.actions';
describe('App Info Reducer', function () {
    describe('undefined action', function () {
        it('should return the existing state', function () {
            var action = { type: 'NOOP' };
            var result = appInfoReducer(undefined, action);
            expect(result).toBe(initialState);
        });
    });
    describe('[AppInfoEffects] Load App Info Success', function () {
        it('should save version number to state', function () {
            var versionNumber = '3.12.7';
            var action = new appInfoActions.LoadAppInfoSuccess(versionNumber);
            var result = appInfoReducer(initialState, action);
            expect(result).toEqual({
                versionNumber: versionNumber,
                employeeId: null,
                employeeName: 'Unknown Name',
            });
        });
    });
    describe('[AppInfoEffects] Load App Info Failure', function () {
        it('should save failure reason to state', function () {
            var error = 'cordova_not_available';
            var action = new appInfoActions.LoadAppInfoFailure(error);
            var result = appInfoReducer(initialState, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { error: error }));
        });
    });
    describe('[LoginComponent] Load employee ID', function () {
        it('should save employeeId to state', function () {
            var employeeId = '6543632';
            var action = new appInfoActions.LoadEmployeeId(employeeId);
            var result = appInfoReducer(initialState, action);
            expect(result).toEqual({
                versionNumber: 'VERSION_NOT_LOADED',
                employeeId: '6543632',
                employeeName: 'Unknown Name',
            });
        });
    });
    describe('[LoginComponent] Load employee name success', function () {
        it('should save employeeNmae to state', function () {
            var employeeName = 'Fake Name';
            var action = new appInfoActions.LoadEmployeeNameSuccess(employeeName);
            var result = appInfoReducer(initialState, action);
            expect(result).toEqual({
                versionNumber: 'VERSION_NOT_LOADED',
                employeeId: null,
                employeeName: 'Fake Name',
            });
        });
    });
});
//# sourceMappingURL=app-info.reducer.spec.js.map