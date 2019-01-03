import { Component, Input } from '@angular/core';

@Component({
  selector: 'journal-indicators',
  templateUrl: 'journal-indicators.html'
})
export class JournalIndicatorsComponent {

  @Input()
  showSpecialNeedsIndicator: boolean;

}
