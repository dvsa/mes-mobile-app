import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'vehicle-details-card-cat-home-test',
  templateUrl: 'vehicle-details-card.html',
})
export class VehicleDetailsCardComponent {

  @Input()
  data: VehicleDetails;

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

}
