import { Component, Input } from '@angular/core';

@Component({
  selector: 'dangerous-tooltip',
  templateUrl: 'dangerous-tooltip.html',
})
export class DangerousTooltipComponent {
  @Input()
  isRemoveMode: boolean = false;
}
