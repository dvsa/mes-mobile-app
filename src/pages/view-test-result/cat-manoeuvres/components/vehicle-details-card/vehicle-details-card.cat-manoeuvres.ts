import { Component, Input } from '@angular/core';
import { VehicleDetailsModel } from './vehicle-details-card.cat-manoeuvres.model';

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
      !this.data.transmission
    );
  }
}
