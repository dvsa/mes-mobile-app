import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { FaultCountDHelper } from '../fault-count.cat-d';
import { vehicleChecksTwoFaults, vehicleChecksFiveFaults } from '../../__mocks__/cat-D-test-data-state-object';
describe('FaultCountDHelper', function () {
    configureTestSuite(function () {
        TestBed.configureTestingModule({});
    });
    describe('getVehicleChecksFaultCountCatD', function () {
        it('5 driving faults result in 1 serious and 4 driving faults', function () {
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD(vehicleChecksFiveFaults).drivingFaults).toEqual(4);
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD(vehicleChecksFiveFaults).seriousFaults).toEqual(1);
        });
        it('2 driving faults result in 2 driving faults and no serious', function () {
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD(vehicleChecksTwoFaults).drivingFaults).toEqual(2);
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD(vehicleChecksTwoFaults).seriousFaults).toEqual(0);
        });
    });
    describe('getVehicleChecksFaultCountCatD1', function () {
        it('5 driving faults result in 1 serious and 4 driving faults', function () {
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD1(vehicleChecksFiveFaults).drivingFaults).toEqual(4);
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD1(vehicleChecksFiveFaults).seriousFaults).toEqual(1);
        });
        it('2 driving faults result in 2 driving faults and no serious', function () {
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD1(vehicleChecksTwoFaults).drivingFaults).toEqual(2);
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD1(vehicleChecksTwoFaults).seriousFaults).toEqual(0);
        });
    });
    describe('getVehicleChecksFaultCountCatDE', function () {
        it('2 driving faults result in 1 driving faults and 1 serious', function () {
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatDE(vehicleChecksTwoFaults).drivingFaults).toEqual(1);
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatDE(vehicleChecksTwoFaults).seriousFaults).toEqual(1);
        });
    });
    describe('getVehicleChecksFaultCountCatD1E', function () {
        it('2 driving faults result in 1 driving faults and 1 serious', function () {
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD1E(vehicleChecksTwoFaults).drivingFaults).toEqual(1);
            expect(FaultCountDHelper
                .getVehicleChecksFaultCountCatD1E(vehicleChecksTwoFaults).seriousFaults).toEqual(1);
        });
    });
});
//# sourceMappingURL=fault-count.spec.js.map