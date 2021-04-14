import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { FaultCountAM2Helper } from '../fault-count.cat-a-mod2';
import { catAM2TestDataStateObject, safetyAndBalanceMock0Faults, safetyAndBalanceMock2FaultsSafety, safetyAndBalanceMock2FaultsSafetyAndBalance, safetyAndBalanceMock3FaultsSafetyAndBalance, } from '../../__mocks__/cat-AM2-test-data-state-object';
describe('FaultCountAM2Helper', function () {
    configureTestSuite(function () {
        TestBed.configureTestingModule({});
    });
    describe('getSafetyAndBalanceFaultCountCatAM2', function () {
        it('0 driving faults', function () {
            var output = { drivingFaults: 0 };
            var temp = FaultCountAM2Helper.getSafetyAndBalanceFaultCountCatAM2(safetyAndBalanceMock0Faults);
            expect(temp).toEqual(output);
        });
        it('1 driving faults, 2 failed safety questions', function () {
            var output = { drivingFaults: 1 };
            var temp = FaultCountAM2Helper.getSafetyAndBalanceFaultCountCatAM2(safetyAndBalanceMock2FaultsSafety);
            expect(temp).toEqual(output);
        });
        it('1 driving faults, 1 failed safety and 1 failed balance question', function () {
            var output = { drivingFaults: 1 };
            var temp = FaultCountAM2Helper.getSafetyAndBalanceFaultCountCatAM2(safetyAndBalanceMock2FaultsSafetyAndBalance);
            expect(temp).toEqual(output);
        });
    });
    it('1 driving fault, 3 failed safety and balance questions', function () {
        var output = { drivingFaults: 1 };
        var temp = FaultCountAM2Helper.getSafetyAndBalanceFaultCountCatAM2(safetyAndBalanceMock3FaultsSafetyAndBalance);
        expect(temp).toEqual(output);
    });
    describe('getDangerousFaultSumCountCatAM2', function () {
        it('should return the dangerous faults count for cat AM2', function () {
            expect(FaultCountAM2Helper.getDangerousFaultSumCountCatAM2(catAM2TestDataStateObject)).toBe(1);
        });
    });
    describe('getSeriousFaultSumCountCatAM2', function () {
        it('should return the serious faults count for cat AM2', function () {
            expect(FaultCountAM2Helper.getSeriousFaultSumCountCatAM2(catAM2TestDataStateObject)).toBe(1);
        });
    });
    describe('getRidingFaultSumCountCatAM2', function () {
        it('should return the driving fault for cat AM2 count correctly', function () {
            expect(FaultCountAM2Helper.getRidingFaultSumCountCatAM2(catAM2TestDataStateObject)).toBe(2);
        });
    });
});
//# sourceMappingURL=fault-count.cat-a-mod2.spec.js.map