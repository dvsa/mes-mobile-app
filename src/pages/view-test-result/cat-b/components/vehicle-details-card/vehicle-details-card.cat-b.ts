import { Component, Input } from '@angular/core';
import { VehicleDetailsModel } from './vehicle-details-card.cat-b.model';
import { flattenArray } from '../../../view-test-result-helpers';

@Component({
  selector: 'vehicle-details-cat-b-card',
  templateUrl: 'vehicle-details-card.cat-b.html',
})
export class VehicleDetailsCardCatBComponent {

  @Input()
  data: VehicleDetailsModel;

  constructor() {}

  shouldHideCard() : boolean {
    return (
      !this.data.instructorRegistrationNumber &&
      !this.data.registrationNumber &&
      !this.data.transmission
    );
  }

  calculateClass(field: any) : string {
    return field ? 'mes-data-row-with-separator' : 'mes-data-row';
  }

  getFlattenArray = (data: string[]): string => flattenArray(data);
}
