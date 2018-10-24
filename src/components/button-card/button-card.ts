import { Component, Input } from '@angular/core';
import { Page } from 'ionic-angular/navigation/nav-util';

/**
 * Generated class for the ButtonCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'button-card',
  templateUrl: 'button-card.html'
})
export class ButtonCardComponent {
  @Input() text: string;
  @Input() page: Page;

  constructor() {}
}
