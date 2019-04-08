import { Component, Input } from '@angular/core';

// TODO: This has to be renamed to driving-faults-badge

@Component({
  selector: 'driving-faults-badge',
  templateUrl: 'driving-faults-badge.html',
})
export class DrivingFaultsBadgeComponent {
  @Input()
  count: number;
}
