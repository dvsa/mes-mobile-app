import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { FaultSummaryCatHomeTestHelper } from '../fault-summary.cat-home-test';
import { catFTestDataStateObject, catFTestDataVCStateObject, } from '../../../fault-count/__mocks__/cat-F-test-data-state-object';
import { catGTestDataStateObject, catGTestDataVCStateObject, } from '../../../fault-count/__mocks__/cat-G-test-data-state-object';
import { catHTestDataStateObject, catHTestDataVCStateObject, } from '../../../fault-count/__mocks__/cat-H-test-data-state-object';
import { catKTestDataStateObject, catKTestDataVCStateObject, } from '../../../fault-count/__mocks__/cat-K-test-data-state-object';
describe('FaultSummaryCatHomeTestHelper', function () {
    configureTestSuite(function () {
        TestBed.configureTestingModule({});
    });
    describe('getDrivingFaultsCatHomeTest (No VehicleChecks)', function () {
        it('should return 4 driving fault count for category F', function () {
            var result = FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest(catFTestDataStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(4);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(4);
            expect(competenciesWithFaults).toContain('controlsGears');
            expect(competenciesWithFaults).toContain('reverseLeftControl');
            expect(competenciesWithFaults).toContain('controlledStop');
            expect(competenciesWithFaults).toContain('highwayCodeSafety');
        });
        it('should return 5 driving fault count for category G', function () {
            var result = FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest(catGTestDataStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(5);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(3);
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
            expect(competenciesWithFaults).toContain('ancillaryControls');
            expect(competenciesWithFaults).toContain('controlsGears');
        });
        it('should return 0 driving fault count for category H', function () {
            var result = FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest(catHTestDataStateObject);
            var faultCount = 0;
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(0);
        });
        it('should return 4 driving fault count for category K', function () {
            var result = FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest(catKTestDataStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(faultCount).toEqual(4);
            expect(competenciesWithFaults.length).toBe(3);
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
            expect(competenciesWithFaults).toContain('ancillaryControls');
            expect(competenciesWithFaults).toContain('controlsGears');
        });
    });
    describe('getDrivingFaultsCatHomeTest (Including VehicleChecks)', function () {
        it('should return 3 driving fault count for category F', function () {
            var result = FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest(catFTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(3);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(3);
            expect(competenciesWithFaults).toContain('controlsGears');
            expect(competenciesWithFaults).toContain('reverseLeftControl');
            expect(competenciesWithFaults).toContain('vehicleChecks');
        });
        it('should return 6 driving fault count for category G', function () {
            var result = FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest(catGTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(6);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(4);
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
            expect(competenciesWithFaults).toContain('ancillaryControls');
            expect(competenciesWithFaults).toContain('controlsGears');
            expect(competenciesWithFaults).toContain('vehicleChecks');
        });
        it('should return 1 driving fault count for category H', function () {
            var result = FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest(catHTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(1);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(1);
            expect(competenciesWithFaults).toContain('vehicleChecks');
        });
        it('should return 5 driving fault count for category K', function () {
            var result = FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest(catKTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(faultCount).toEqual(5);
            expect(competenciesWithFaults.length).toBe(4);
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
            expect(competenciesWithFaults).toContain('ancillaryControls');
            expect(competenciesWithFaults).toContain('controlsGears');
            expect(competenciesWithFaults).toContain('vehicleChecks');
        });
    });
    describe('getSeriousFaultsCatHomeTest (No VehicleChecks)', function () {
        it('should return 2 serious fault count for category F', function () {
            var result = FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest(catFTestDataStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(2);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(2);
            expect(competenciesWithFaults).toContain('awarenessPlanning');
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
        });
        it('should return 6 serious fault count for category G', function () {
            var result = FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest(catGTestDataStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(6);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(6);
            expect(competenciesWithFaults).toContain('controlsGears');
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
            expect(competenciesWithFaults).toContain('ancillaryControls');
            expect(competenciesWithFaults).toContain('awarenessPlanning');
            expect(competenciesWithFaults).toContain('reverseLeftControl');
            expect(competenciesWithFaults).toContain('highwayCodeSafety');
        });
        it('should return 2 serious fault count for category H', function () {
            var result = FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest(catHTestDataStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(2);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(2);
            expect(competenciesWithFaults).toContain('awarenessPlanning');
            expect(competenciesWithFaults).toContain('controlledStop');
        });
        it('should return 0 serious fault count for category K', function () {
            var result = FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest(catKTestDataStateObject);
            var faultCount = 0;
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(0);
        });
    });
    describe('getSeriousFaultsCatHomeTest (Including VehicleChecks)', function () {
        it('should return 2 serious fault count for category F', function () {
            var result = FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest(catFTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(2);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(2);
            expect(competenciesWithFaults).toContain('awarenessPlanning');
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
        });
        it('should return 5 serious fault count for category G', function () {
            var result = FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest(catGTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(5);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(5);
            expect(competenciesWithFaults).toContain('controlsGears');
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
            expect(competenciesWithFaults).toContain('ancillaryControls');
            expect(competenciesWithFaults).toContain('awarenessPlanning');
            expect(competenciesWithFaults).toContain('reverseLeftControl');
        });
        it('should return 1 serious fault count for category H', function () {
            var result = FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest(catHTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(1);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(1);
            expect(competenciesWithFaults).toContain('awarenessPlanning');
        });
        it('should return 0 serious fault count for category K', function () {
            var result = FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest(catKTestDataVCStateObject);
            var faultCount = 0;
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(0);
        });
    });
    describe('getDangerousFaultsCatHomeTest (No VehicleChecks)', function () {
        it('should return 2 dangerous fault count for category F', function () {
            var result = FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest(catFTestDataStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(2);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(2);
            expect(competenciesWithFaults).toContain('useOfSpeed');
            expect(competenciesWithFaults).toContain('ancillaryControls');
        });
        it('should return 5 dangerous fault count for category G', function () {
            var result = FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest(catGTestDataStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(5);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(5);
            expect(competenciesWithFaults).toContain('controlsGears');
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
            expect(competenciesWithFaults).toContain('ancillaryControls');
            expect(competenciesWithFaults).toContain('awarenessPlanning');
            expect(competenciesWithFaults).toContain('controlledStop');
        });
        it('should return 2 dangerous fault count for category H', function () {
            var result = FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest(catHTestDataStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(2);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(2);
            expect(competenciesWithFaults).toContain('useOfSpeed');
            expect(competenciesWithFaults).toContain('reverseLeftControl');
        });
        it('should return 0 dangerous fault count for category K', function () {
            var result = FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest(catKTestDataStateObject);
            var faultCount = 0;
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(0);
        });
    });
    describe('getDangerousFaultsCatHomeTest (Including VehicleChecks)', function () {
        it('should return 2 dangerous fault count for category F', function () {
            var result = FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest(catFTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(2);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(2);
            expect(competenciesWithFaults).toContain('useOfSpeed');
            expect(competenciesWithFaults).toContain('ancillaryControls');
        });
        it('should return 4 dangerous fault count for category G', function () {
            var result = FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest(catGTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(4);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(4);
            expect(competenciesWithFaults).toContain('controlsGears');
            expect(competenciesWithFaults).toContain('pedestrianCrossings');
            expect(competenciesWithFaults).toContain('ancillaryControls');
            expect(competenciesWithFaults).toContain('awarenessPlanning');
        });
        it('should return 2 dangerous fault count for category H', function () {
            var result = FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest(catHTestDataVCStateObject);
            var faultCount = 0;
            var competenciesWithFaults = [];
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(2);
            result.map(function (fault) { return competenciesWithFaults.push(fault.competencyIdentifier); });
            expect(competenciesWithFaults.length).toBe(2);
            expect(competenciesWithFaults).toContain('useOfSpeed');
            expect(competenciesWithFaults).toContain('reverseLeftControl');
        });
        it('should return 0 dangerous fault count for category K', function () {
            var result = FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest(catKTestDataVCStateObject);
            var faultCount = 0;
            result.map(function (fault) { return faultCount = faultCount + fault.faultCount; });
            expect(faultCount).toEqual(0);
        });
    });
});
//# sourceMappingURL=fault-summary.cat-home-test.spec.js.map