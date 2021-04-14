import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { FaultCountCHelper } from '../fault-count.cat-c';
import { vehicleChecksTwoFaults, vehicleChecksFiveFaults } from '../../__mocks__/cat-C-test-data-state-object';
describe('FaultCountCHelper', function () {
    configureTestSuite(function () {
        TestBed.configureTestingModule({});
    });
    describe('getVehicleChecksFaultCountCatC', function () {
        it('5 driving faults result in 1 serious and 4 driving faults', function () {
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC(vehicleChecksFiveFaults).drivingFaults).toEqual(4);
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC(vehicleChecksFiveFaults).seriousFaults).toEqual(1);
        });
        it('2 driving faults result in 2 driving faults and no serious', function () {
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC(vehicleChecksTwoFaults).drivingFaults).toEqual(2);
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC(vehicleChecksTwoFaults).seriousFaults).toEqual(0);
        });
    });
    describe('getVehicleChecksFaultCountCatC1', function () {
        it('5 driving faults result in 1 serious and 4 driving faults', function () {
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC1(vehicleChecksFiveFaults).drivingFaults).toEqual(4);
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC1(vehicleChecksFiveFaults).seriousFaults).toEqual(1);
        });
        it('2 driving faults result in 2 driving faults and no serious', function () {
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC1(vehicleChecksTwoFaults).drivingFaults).toEqual(2);
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC1(vehicleChecksTwoFaults).seriousFaults).toEqual(0);
        });
    });
    describe('getVehicleChecksFaultCountCatCE', function () {
        it('2 driving faults result in 1 driving faults and 1 serious', function () {
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatCE(vehicleChecksTwoFaults).drivingFaults).toEqual(1);
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatCE(vehicleChecksTwoFaults).seriousFaults).toEqual(1);
        });
    });
    describe('getVehicleChecksFaultCountCatC1E', function () {
        it('2 driving faults result in 1 driving faults and 1 serious', function () {
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC1E(vehicleChecksTwoFaults).drivingFaults).toEqual(1);
            expect(FaultCountCHelper
                .getVehicleChecksFaultCountCatC1E(vehicleChecksTwoFaults).seriousFaults).toEqual(1);
        });
    });
});
//# sourceMappingURL=fault-count.spec.js.map