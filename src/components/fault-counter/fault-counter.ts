import { Component, Input } from '@angular/core';

@Component({
  selector: 'fault-counter',
  templateUrl: 'fault-counter.html',
})
export class FaultCounterComponent {
  @Input()
  count: number;
}
