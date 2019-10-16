import { Component } from '@angular/core';

/**
 * Generated class for the TransmissionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'transmission',
  templateUrl: 'transmission.html',
})
export class TransmissionComponent {

  text: string;

  constructor() {
    console.log('Hello TransmissionComponent Component');
    this.text = 'Hello World';
  }

}
