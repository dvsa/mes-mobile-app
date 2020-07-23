import { Component, Input } from '@angular/core';

@Component({
  selector: 'serious-faults-debrief-card',
  templateUrl: 'serious-faults-debrief-card.html',
})
export class SeriousFaultsDebriefCardComponent {

  @Input()
  public seriousFaults: string[];

  @Input()
  public isBikeCategory?: boolean = false;

}
