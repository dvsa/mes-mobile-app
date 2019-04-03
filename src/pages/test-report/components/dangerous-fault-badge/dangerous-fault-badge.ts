import { Component, Input } from '@angular/core';

@Component({
  selector: 'dangerous-fault-badge',
  templateUrl: 'dangerous-fault-badge.html',
})
export class DangerousFaultBadgeComponent {

  @Input()
  showBadge: boolean;
}
