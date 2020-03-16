import { Injectable } from '@angular/core';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { getVehicleDetails as getVehicleDetailsC }
  from '../../modules/tests/vehicle-details/cat-c/vehicle-details.cat-c.reducer';
import { getVehicleDetails as getVehicleDetailsD }
  from '../../modules/tests/vehicle-details/cat-d/vehicle-details.cat-d.reducer';
import { getVehicleDetails as getVehicleDetailsBE }
  from '../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.reducer';
import { getVehicleWidth as getVehicleWidthBE, getVehicleLength as getVehicleLengthBE }
  from '../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.selector';
import { getVehicleWidth as getVehicleWidthC, getVehicleLength as getVehicleLengthC }
  from '../../modules/tests/vehicle-details/cat-c/vehicle-details.cat-c.selector';
import { getVehicleWidth as getVehicleWidthD, getVehicleLength as getVehicleLengthD }
  from '../../modules/tests/vehicle-details/cat-d/vehicle-details.cat-d.selector';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export interface CategorySpecificVehicleDetails {
  vehicleDetails: any;
  vehicleWidth: any;
  vehicleLength: any;
}

@Injectable()
export class VehicleDetailsByCategoryProvider {

  static getVehicleDetailsByCategoryCodeErrMsg: string = 'Error getting test category vehicle details';

  public getVehicleDetailsByCategoryCode(category: CategoryCode): CategorySpecificVehicleDetails {
    switch (category) {
      case TestCategory.BE:
        return {
          vehicleDetails: getVehicleDetailsBE,
          vehicleWidth: getVehicleWidthBE,
          vehicleLength: getVehicleLengthBE,
        };
      case TestCategory.C:
      case TestCategory.C1:
      case TestCategory.CE:
      case TestCategory.C1E:
        return {
          vehicleDetails: getVehicleDetailsC,
          vehicleWidth: getVehicleWidthC,
          vehicleLength: getVehicleLengthC,
        };
      case TestCategory.D:
      case TestCategory.D1:
      case TestCategory.DE:
      case TestCategory.D1E:
        return {
          vehicleDetails: getVehicleDetailsD,
          vehicleWidth: getVehicleWidthD,
          vehicleLength: getVehicleLengthD,
        };
      case TestCategory.F:
      case TestCategory.G:
      case TestCategory.H:
      case TestCategory.K:
        return {
          vehicleDetails: getVehicleDetailsD,
          vehicleWidth: getVehicleWidthD,
          vehicleLength: getVehicleLengthD,
        };
      default:
        throw new Error(VehicleDetailsByCategoryProvider.getVehicleDetailsByCategoryCodeErrMsg);
    }
  }
}
