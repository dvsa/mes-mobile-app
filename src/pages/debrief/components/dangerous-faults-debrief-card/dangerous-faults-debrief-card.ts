import { Component, Input } from '@angular/core';

@Component({
  selector: 'dangerous-faults-debrief-card',
  templateUrl: 'dangerous-faults-debrief-card.html',
})
export class DangerousFaultsDebriefCardComponent {

  @Input()
  public dangerousFaults: string[];

  @Input()
  public isBikeCategory?: boolean = false;

}
