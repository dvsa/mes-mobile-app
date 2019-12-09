import { Component, Input } from '@angular/core';
import { VehicleDetailsModel } from './vehicle-details-card.model';
import { flattenArray } from '../../../view-test-result-helpers';

@Component({
  selector: 'vehicle-details-card',
  templateUrl: 'vehicle-details-card.html',
})
export class VehicleDetailsCardComponent {

  @Input()
  data: VehicleDetailsModel;

  constructor() {}

  shouldHideCard() : boolean {
    return (
      !this.data.registrationNumber &&
      !this.data.transmission
    );
  }

  calculateClass(field: any) : string {
    return field ? 'mes-data-row-with-separator' : 'mes-data-row';
  }

  getFlattenArray = (data: string[]): string => flattenArray(data);
}
