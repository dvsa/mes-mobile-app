import { Component, Input } from '@angular/core';
import { RekeyDetailsModel } from './rekey-details-card.model';

@Component({
  selector: 'rekey-details-card',
  templateUrl: 'rekey-details-card.html',
})
export class RekeyDetailsCardComponent {

  @Input()
  rekeyDetails: RekeyDetailsModel;

  constructor() {}

}
