import { Injectable } from '@angular/core';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { ReversingLengths } from './reversing-lengths.model';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';

export type CatCVehicleDetailsUnion =
  | CatCUniqueTypes.VehicleDetails
  | CatC1UniqueTypes.VehicleDetails
  | CatCEUniqueTypes.VehicleDetails
  | CatC1UniqueTypes.VehicleDetails;

@Injectable()
export class ReversingDistancesProvider {

  public getDistanceLength(data: object, category: TestCategory): ReversingLengths {
    switch (category) {
      case TestCategory.BE:
        return this.getDistanceLengthCatBE(data);
      case TestCategory.C:
        return this.getDistanceLengthCatC(data, 3.5);
      case TestCategory.CE:
        return this.getDistanceLengthCatCE(data, 4);
      case TestCategory.C1:
        return this.getDistanceLengthCatC(data, 3.5);
      case TestCategory.C1E:
        return this.getDistanceLengthCatCE(data, 4);
      default:
        return { startDistance: 52.5, middleDistance: 30 };
    }
  }

  public getDistanceWidth(data: object, category: TestCategory): number {
    switch (category) {
      case TestCategory.BE:
        return this.getDistanceWidthCatBE(data);
      case TestCategory.C:
        return this.getDistanceWidthCatC(data);
      case TestCategory.CE:
        return this.getDistanceWidthCatC(data);
      case TestCategory.C1:
        return this.getDistanceWidthCatC(data);
      case TestCategory.C1E:
        return this.getDistanceWidthCatC(data);
      default:
        return 3;
    }
  }

  private getDistanceWidthCatC(data: CatCVehicleDetailsUnion): number {
    const distanceOfBayWidth = data.vehicleWidth * 1.5;
    return Math.round(distanceOfBayWidth * 100) / 100;
  }

  private getDistanceLengthCatC(data: CatCVehicleDetailsUnion, multiplier: number): ReversingLengths {
    const distanceFromStart = data.vehicleLength * multiplier;
    const distanceFromMiddle = data.vehicleLength * 2;
    return ({
      startDistance:  Math.round(distanceFromStart * 100) / 100,
      middleDistance: Math.round(distanceFromMiddle * 100) / 100,
    });
  }

  private getDistanceLengthCatCE(data: CatCVehicleDetailsUnion, multiplier: number): ReversingLengths {
    const distanceFromStart = data.vehicleLength * multiplier;
    const distanceFromMiddle = data.vehicleLength * 2;
    return ({
      startDistance: data.vehicleLength > 16.5 ? 66 : Math.round(distanceFromStart * 100) / 100,
      middleDistance: Math.round(distanceFromMiddle * 100) / 100,
    });
  }

  private getDistanceWidthCatBE(data: CatBEUniqueTypes.VehicleDetails): number {
    const distanceOfBayWidth = data.vehicleWidth * 1.5;
    return Math.round(distanceOfBayWidth * 100) / 100;
  }

  private getDistanceLengthCatBE(data: CatBEUniqueTypes.VehicleDetails): ReversingLengths {
    const distanceFromStart = data.vehicleLength * 4;
    const distanceFromMiddle = data.vehicleLength * 2;
    return ({
      startDistance: Math.round(distanceFromStart * 100) / 100,
      middleDistance: Math.round(distanceFromMiddle * 100) / 100,
    });
  }
}
