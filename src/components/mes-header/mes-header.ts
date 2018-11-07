import { Component, Input } from '@angular/core';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mes-header',
  templateUrl: 'mes-header.html'
})
export class HeaderComponent {
  @Input() title: string;
  @Input() hideBackButton: boolean = false;

  constructor() {}
}
