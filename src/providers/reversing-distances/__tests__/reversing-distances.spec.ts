import { ReversingDistancesProvider } from '../reversing-distances';
import { TestBed } from '@angular/core/testing';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
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
    // TODO: Use CAT C type
    const vehicleDetails: CatBEUniqueTypes.VehicleDetails = {
      vehicleLength: 15,
      vehicleWidth: 2,
    };

    describe('Category C', () => {
      it('should return a start distance value 3 and a half times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.C);
        expect(result.startDistance).toEqual(52.5);
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

      it('should return a middle distance value 2 times the vehicle length', () => {
        const result = reversingDistancesProvider.getDistanceLength(vehicleDetails, TestCategory.C1E);
        expect(result.middleDistance).toEqual(30);
      });
    });
  });

  describe('getDistanceWidth', () => {
    // TODO: Use CAT C type
    const vehicleDetails: CatBEUniqueTypes.VehicleDetails = {
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
