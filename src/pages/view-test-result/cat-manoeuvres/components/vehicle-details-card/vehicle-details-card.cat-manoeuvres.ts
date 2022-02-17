import { Component, Input } from '@angular/core';
import { VehicleDetailsModel } from './vehicle-details-card.cat-manoeuvres.model';
import { get } from 'lodash';

@Component({
  selector: 'vehicle-details-cat-manoeuvres-card',
  templateUrl: 'vehicle-details-card.cat-manoeuvres.html',
})
export class VehicleDetailsCardCatManoeuvresComponent {

  @Input()
  data: VehicleDetailsModel;

  constructor() {}

  shouldHideCard() : boolean {
    return (
      !get(this.data, 'vehicleRegistration') &&
      !this.showDimensions()
    );
  }

  showDimensions = (): boolean => {
    return [
      get(this.data, 'dimensions.vehicleWidth'),
      get(this.data, 'dimensions.vehicleHeight'),
      get(this.data, 'dimensions.vehicleLength'),
      get(this.data, 'dimensions.numberOfSeats'),
    ].some(dim => dim.toString() !== '-');
  }
}
