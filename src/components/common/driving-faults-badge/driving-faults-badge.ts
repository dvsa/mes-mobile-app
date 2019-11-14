import { Component, Input } from '@angular/core';

@Component({
  selector: 'driving-faults-badge',
  templateUrl: 'driving-faults-badge.html',
})
export class DrivingFaultsBadgeComponent {
  @Input()
  count: number;

  @Input()
  showOnZero: boolean = false;

  shouldDisplay = () => {
    return this.showOnZero || this.count > 0;
  }
}
