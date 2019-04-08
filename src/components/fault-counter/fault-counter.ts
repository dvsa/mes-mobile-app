import { Component, Input } from '@angular/core';

// TODO: This has to be renamed to driving-faults-badge

@Component({
  selector: 'fault-counter',
  templateUrl: 'fault-counter.html',
})
export class FaultCounterComponent {
  @Input()
  count: number;
}
