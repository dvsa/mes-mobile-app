import { Component, Input } from '@angular/core';
import { Address } from '@dvsa/mes-test-schema/categories/B';

@Component({
  selector: 'display-address',
  templateUrl: 'display-address.html',
})
export class DisplayAddressComponent {

  @Input()
  address: Address;

}
