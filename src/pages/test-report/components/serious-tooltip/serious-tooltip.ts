import { Component, Input } from '@angular/core';

@Component({
  selector: 'serious-tooltip',
  templateUrl: 'serious-tooltip.html',
})
export class SeriousTooltipComponent {
  @Input()
  isRemoveMode: boolean = false;
}
