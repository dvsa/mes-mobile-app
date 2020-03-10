import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import * as CatAMod1Types from '@dvsa/mes-test-schema/categories/AM1';

@Component({
  selector: 'vehicle-details-card-cat-a',
  templateUrl: 'vehicle-details-card-cat-a.html',
})
export class VehicleDetailsCardCatAComponent {

  @Input()
  data: CatAMod1Types.VehicleDetails;

  constructor() {}

  public shouldHideCard() : boolean {
    return (
      !this.getTransmission() &&
      !this.getRegistrationNumber() &&
      !this.getSchoolBike()
    );
  }

  public getTransmission(): string {
    return get(this.data, 'gearboxCategory');
  }

  public getRegistrationNumber(): string {
    return get(this.data, 'registrationNumber');
  }

  public getSchoolBike(): boolean {
    return get(this.data, 'schoolBike');
  }

}
