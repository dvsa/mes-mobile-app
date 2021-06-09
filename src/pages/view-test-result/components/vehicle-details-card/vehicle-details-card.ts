import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export type VehicleDetailsWithDimensions =
  | CatBEUniqueTypes.VehicleDetails
  | CatCUniqueTypes.VehicleDetails
  | CatCEUniqueTypes.VehicleDetails
  | CatC1UniqueTypes.VehicleDetails
  | CatC1EUniqueTypes.VehicleDetails;

@Component({
  selector: 'vehicle-details-card',
  templateUrl: 'vehicle-details-card.html',
})
export class VehicleDetailsCardComponent {

  @Input()
  data: CatBEUniqueTypes.VehicleDetails;

  @Input()
  category: TestCategory;

  @Input()
  passCompletion?: CatCUniqueTypes.PassCompletion = null;

  constructor() {}

  public shouldHideCard() : boolean {
    return (
      !this.getTransmission() &&
      !this.getRegistrationNumber()
    );
  }

  public shouldHideDimensions() : boolean {
    switch (this.category) {
      case TestCategory.F:
      case TestCategory.G:
      case TestCategory.H:
      case TestCategory.K:
        return true;
      default:
        return false;
    }
  }

  public getTransmission(): string {
    return get(this.data, 'gearboxCategory');
  }

  public getRegistrationNumber(): string {
    return get(this.data, 'registrationNumber');
  }

  public getVehicleLength(): string {
    return get(this.data, 'vehicleLength'.toString() , '?');
  }

  public getVehicleWidth(): string {
    return get(this.data, 'vehicleWidth'.toString() , '?');
  }

}
