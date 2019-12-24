import { Injectable } from '@angular/core';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
// TODO: Import CAT C types
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { ReversingLengths } from './reversing-lengths.model';

// TODO: refactor CAT BE to use this provider
@Injectable()
export class ReversingDistancesProvider {

  public getDistanceLength(data: object, category: TestCategory): ReversingLengths {
    switch (category) {
      case TestCategory.C:
        return this.getDistanceLengthCat(data, 3.5);
      case TestCategory.CE:
        return this.getDistanceLengthCat(data, 4);
      case TestCategory.C1:
        return this.getDistanceLengthCat(data, 3.5);
      case TestCategory.C1E:
        return this.getDistanceLengthCat(data, 4);
      default:
        return { startDistance: 52.5, middleDistance: 30 };
    }
  }

  public getDistanceWidth(data: object, category: TestCategory): number {
    switch (category) {
      case TestCategory.C:
        return this.getDistanceWidthCat(data);
      case TestCategory.CE:
        return this.getDistanceWidthCat(data);
      case TestCategory.C1:
        return this.getDistanceWidthCat(data);
      case TestCategory.C1E:
        return this.getDistanceWidthCat(data);
      default:
        return 3;
    }
  }

  // TODO: Use CAT C types
  private getDistanceWidthCat(data: CatBEUniqueTypes.VehicleDetails): number {
    const distanceOfBayWidth = data.vehicleWidth * 1.5;
    return Math.round(distanceOfBayWidth * 100) / 100;
  }

  // TODO: Use CAT C types
  private getDistanceLengthCat(data: CatBEUniqueTypes.VehicleDetails, multiplier: number): ReversingLengths {
    const distanceFromStart = data.vehicleLength * multiplier;
    const distanceFromMiddle = data.vehicleLength * 2;
    return ({
      startDistance: data.vehicleLength > 16.5 ? 66 : Math.round(distanceFromStart * 100) / 100,
      middleDistance: Math.round(distanceFromMiddle * 100) / 100,
    });
  }
}
