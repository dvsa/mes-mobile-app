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
import { FaultsDataRowComponent } from '../faults-data-row';
describe('FaultsDataRowComponent', function () {
    describe('deafultSettings', function () {
        it('should have 15 as minDrivingFaultCount when the component is created', function () {
            var component = new FaultsDataRowComponent();
            expect(component.minDrivingFaultCount).toBe(15);
        });
    });
    describe('showFaultComment', function () {
        var faultSummary = {
            competencyIdentifier: 'compId',
            competencyDisplayName: 'dispName',
            faultCount: 2,
            comment: 'comment',
        };
        it('should return false when drivingFaultCount is less than minDrivingFaultCount', function () {
            var component = new FaultsDataRowComponent();
            component.drivingFaultCount = 5;
            component.minDrivingFaultCount = 6;
            var result = component.showFaultComment(faultSummary);
            expect(result).toBe(false);
        });
        it('should return false when drivingFaultCount is equal to minDrivingFaultCount', function () {
            var component = new FaultsDataRowComponent();
            component.drivingFaultCount = 6;
            component.minDrivingFaultCount = 6;
            var result = component.showFaultComment(faultSummary);
            expect(result).toBe(false);
        });
        it('should return false when there are no comments', function () {
            var localFaultSummary = __assign(__assign({}, faultSummary), { comment: undefined });
            var component = new FaultsDataRowComponent();
            component.drivingFaultCount = 7;
            component.minDrivingFaultCount = 6;
            var result = component.showFaultComment(localFaultSummary);
            expect(result).toBe(false);
        });
        it('should return true when drivingFaultCount is greater than minDrivingFaultCount and has comments', function () {
            var component = new FaultsDataRowComponent();
            component.drivingFaultCount = 7;
            component.minDrivingFaultCount = 6;
            var result = component.showFaultComment(faultSummary);
            expect(result).toBe(true);
        });
    });
    describe('getDriverType', function () {
        it('should return riding when isRider is true', function () {
            var component = new FaultsDataRowComponent();
            expect(component.getDriverType(true)).toBe('riding');
        });
        it('should return driving when isRider is false', function () {
            var component = new FaultsDataRowComponent();
            expect(component.getDriverType(false)).toBe('driving');
        });
    });
});
//# sourceMappingURL=faults-data-row.spec.js.map