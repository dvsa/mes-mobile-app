import { Component, Input } from '@angular/core';
// todo: PREP-AMOD1 change to CatAMod1UniqueTypes when schema changes are ready
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { get } from 'lodash';

@Component({
  selector: 'vehicle-details-card',
  templateUrl: 'vehicle-details-card.html',
})
export class VehicleDetailsCardComponent {

  @Input()
  // todo: PREP-AMOD1 change to CatAMod1UniqueTypes when schema changes are ready
  data: CatBEUniqueTypes.VehicleDetails;

  constructor() {}

  public shouldHideCard() : boolean {
    return (
      !this.getTransmission() &&
      !this.getRegistrationNumber()
    );
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
