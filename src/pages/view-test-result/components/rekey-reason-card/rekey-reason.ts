import { Component, Input } from '@angular/core';
import { RekeyReason } from '@dvsa/mes-test-schema/categories/Common';

@Component({
  selector: 'rekey-reason-card',
  templateUrl: 'rekey-reason-card.html',
})
export class RekeyReasonCardComponent {

  @Input()
  rekeyReason: RekeyReason;

  constructor() {}

}
