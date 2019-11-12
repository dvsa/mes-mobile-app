import { Component, Input } from '@angular/core';

@Component({
  selector: 'warning-banner',
  templateUrl: 'warning-banner.html',
})

export class WarningBannerComponent {

  @Input()
  warningText: string;

  constructor() {

  }

}
