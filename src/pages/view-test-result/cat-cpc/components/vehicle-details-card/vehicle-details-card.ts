import { Component, Input } from '@angular/core';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/CPC';

@Component({
  selector: 'cpc-vehicle-details-card',
  templateUrl: 'vehicle-details-card.html',
})
export class CPCVehicleDetailsCardComponent {

  @Input()
  public vehicleDetails: VehicleDetails;

  getCombination(): string {
    return this.vehicleDetails.configuration || 'N/A';
  }
}
