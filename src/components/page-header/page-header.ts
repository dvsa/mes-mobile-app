import { Component, Input } from '@angular/core';

/**
 * Generated class for the PageHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-header',
  templateUrl: 'page-header.html'
})
export class PageHeaderComponent {
  @Input() deviceLocked: boolean;
  @Input() isRecording: boolean;
  examinerName: string = 'Ammar Haider';

  constructor() {}
}
