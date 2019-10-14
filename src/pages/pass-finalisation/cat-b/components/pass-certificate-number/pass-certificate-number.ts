import { Component } from '@angular/core';

/**
 * Generated class for the PassCertificateNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pass-certificate-number',
  templateUrl: 'pass-certificate-number.html'
})
export class PassCertificateNumberComponent {

  text: string;

  constructor() {
    console.log('Hello PassCertificateNumberComponent Component');
    this.text = 'Hello World';
  }

}
