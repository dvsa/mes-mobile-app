import { ReversingDistancesProvider, VehicleDetailsUnion } from '../reversing-distances';
import { TestBed } from '@angular/core/testing';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';

describe('ReversingDistancesProvider', () => {

  let reversingDistancesProvider: ReversingDistancesProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        ReversingDistancesProvider,
      ],
    });
  });

  beforeEach(() => {
    reversingDistancesProvider = TestBed.get(ReversingDistancesProvider);
  });

  describe('getDistanceLength', () => {
    const vehicleDetails: VehicleDetailsUnion = {
      vehicleLength: 15,
      vehicleWidth: 2,
    };

    const longVehicleDetails: VehicleDetailsUnion = {
      vehicleLength: 20,
      vehicleWidth: 2,
    };

    describe('Category C', () => {
      it('should return a start distance value 3 and a half times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.C);
        expect(result.startDistance).toEqual(52.5);
      });

      it('should return a value 3 and a half times vehicle length if greater than 16.5', () => {
        const result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, TestCategory.C);
        expect(result.startDistance).toEqual(70);
      });

      it('should return a middle distance value 2 times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.C);
        expect(result.middleDistance).toEqual(30);
      });
    });

    describe('Category C+E', () => {
      it('should return a start distance 4 times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.CE);
        expect(result.startDistance).toEqual(60);
      });

      it('should return a start distance of 66 if the vehicle length is greater than 16.5', () => {
        const result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, TestCategory.CE);
        expect(result.startDistance).toEqual(66);
      });

      it('should return a middle distance value 2 times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.CE);
        expect(result.middleDistance).toEqual(30);
      });
    });

    describe('Category C1', () => {
      it('should return a start distance value 3 and a half times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.C1);
        expect(result.startDistance).toEqual(52.5);
      });

      it('should return a value 3 and a half times vehicle length if greater than 16.5', () => {
        const result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, TestCategory.C1);
        expect(result.startDistance).toEqual(70);
      });

      it('should return a middle distance value 2 times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.C1);
        expect(result.middleDistance).toEqual(30);
      });
    });

    describe('Category C1+E', () => {
      it('should return a start distance 4 times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.C1E);
        expect(result.startDistance).toEqual(60);
      });

      it('should return a start distance of 66 if the vehicle length is greater than 16.5', () => {
        const result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, TestCategory.C1E);
        expect(result.startDistance).toEqual(66);
      });

      it('should return a middle distance value 2 times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.C1E);
        expect(result.middleDistance).toEqual(30);
      });
    });
  });

  describe('getDistanceWidth', () => {
    const vehicleDetails: VehicleDetailsUnion = {
      vehicleLength: 15,
      vehicleWidth: 2,
    };

    describe('Category C', () => {
      it('should return a value 1 and a half times the vehicle width', () => {
        const result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, TestCategory.C);
        expect(result).toEqual(3);
      });
    });

    describe('Category C+E', () => {
      it('should return a value 1 and a half times the vehicle width', () => {
        const result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, TestCategory.CE);
        expect(result).toEqual(3);
      });
    });

    describe('Category C1', () => {
      it('should return a value 1 and a half times the vehicle width', () => {
        const result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, TestCategory.C1);
        expect(result).toEqual(3);
      });
    });

    describe('Category C1+E', () => {
      it('should return a value 1 and a half times the vehicle width', () => {
        const result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, TestCategory.C1E);
        expect(result).toEqual(3);
      });
    });
  });
});
