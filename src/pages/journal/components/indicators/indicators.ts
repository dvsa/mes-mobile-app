import { Component, Input } from '@angular/core';

@Component({
  selector: 'indicators',
  templateUrl: 'indicators.html'
})
export class IndicatorsComponent {

  @Input()
  showExclamationIndicator: boolean;

}
