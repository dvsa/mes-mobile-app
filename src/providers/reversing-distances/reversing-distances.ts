import { Injectable } from '@angular/core';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { ReversingLengths } from './reversing-lengths.model';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';

export type VehicleDetailsUnion =
  | CatBEUniqueTypes.VehicleDetails
  | CatCUniqueTypes.VehicleDetails
  | CatC1UniqueTypes.VehicleDetails
  | CatCEUniqueTypes.VehicleDetails
  | CatC1EUniqueTypes.VehicleDetails
  | CatDUniqueTypes.VehicleDetails
  | CatD1UniqueTypes.VehicleDetails
  | CatDEUniqueTypes.VehicleDetails
  | CatD1EUniqueTypes.VehicleDetails;

interface VehicleMultipliers {
  widthMultiplier: number;
  lengthMultiplier: number;
  distanceMultiplier: number;
}

@Injectable()
export class ReversingDistancesProvider {

  distanceValues: Map<TestCategory, VehicleMultipliers>;

  public getDistanceValues() : Map<TestCategory, VehicleMultipliers> {
    if (!this.distanceValues) {
      this.distanceValues = new Map([
        [TestCategory.BE, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
        [TestCategory.C, { lengthMultiplier: 3.5, widthMultiplier: 1.5, distanceMultiplier: 1.5 }],
        [TestCategory.CE, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
        [TestCategory.C1, { lengthMultiplier: 3.5, widthMultiplier: 1.5, distanceMultiplier: 1.5 }],
        [TestCategory.C1E, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
        [TestCategory.D, { lengthMultiplier: 3.5, widthMultiplier: 1.5, distanceMultiplier: 1.5 }],
        [TestCategory.DE, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
        [TestCategory.D1, { lengthMultiplier: 3.5, widthMultiplier: 1.5, distanceMultiplier: 1.5 }],
        [TestCategory.D1E, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
      ]);
    }
    return this.distanceValues;
  }

  public getDistanceLength(data: VehicleDetailsUnion, category: TestCategory): ReversingLengths {
    if (!this.getDistanceValues().has(category)) {
      return { startDistance: 52.5, middleDistance: 30 };
    }
    const distanceFromStart = data.vehicleLength * this.distanceValues.get(category).lengthMultiplier;
    const distanceFromMiddle = data.vehicleLength * this.distanceValues.get(category).distanceMultiplier;

    switch (category) {
      case TestCategory.CE:
      case TestCategory.C1E:
      case TestCategory.DE:
      case TestCategory.D1E:
        return ({
          startDistance: data.vehicleLength > 16.5 ? 66 : Number(distanceFromStart.toFixed(2)),
          middleDistance: data.vehicleLength > 16.5
            ? Number((66 - (data.vehicleLength * 2)).toFixed(2))
            : Number(distanceFromMiddle.toFixed(2)),
        });
      default:
        return ({
          startDistance: Number(distanceFromStart.toFixed(2)),
          middleDistance: Number(distanceFromMiddle.toFixed(2)),
        });
    }
  }

  public getDistanceWidth(data: VehicleDetailsUnion, category: TestCategory): number {
    if (!this.getDistanceValues().has(category)) {
      return 3;
    }
    const distanceOfBayWidth = data.vehicleWidth * this.distanceValues.get(category).widthMultiplier;
    return Number(distanceOfBayWidth.toFixed(2));
  }

}
