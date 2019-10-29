import { Component } from '@angular/core';
@Component({
  selector: 'vehicle-checks-cat-be',
  templateUrl: 'vehicle-checks.cat-be.html',
})
export class VehicleChecksCatBEComponent {

  isInvalid(): boolean {
    // TODO - need to implment validation + unit test
    return false;
  }

  openVehicleChecksModal(): void {
    // TODO
    console.log('Here');
  }
}
