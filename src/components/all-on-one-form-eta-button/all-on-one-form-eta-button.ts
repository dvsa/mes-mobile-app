import { Component, Input } from '@angular/core';

/**
 * Generated class for the AllOnOneFormEtaButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'all-on-one-form-eta-button',
  templateUrl: 'all-on-one-form-eta-button.html'
})
export class AllOnOneFormEtaButtonComponent {
  @Input() isEnabled: boolean = false;
  @Input() text: string;
  @Input() pAction: boolean;
  @Input() vAction: boolean;

  constructor() {}

  toggle() {
    this.isEnabled = !this.isEnabled;
  }
}
