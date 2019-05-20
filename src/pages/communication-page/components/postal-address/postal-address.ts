import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '@dvsa/mes-test-schema/categories/B';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'postal-address',
  templateUrl: 'postal-address.html',
})
export class PostalAddressComponent {

  readonly postalType = 'Post';

  @Input()
  formGroup: FormGroup;

  @Input()
  postalAddress: Address;

  @Input()
  isPostalAddressChosen: boolean;

  @Output()
  postalRadioSelect = new EventEmitter();

  postalRadioSelected() {
    this.postalRadioSelect.emit();
  }
}
