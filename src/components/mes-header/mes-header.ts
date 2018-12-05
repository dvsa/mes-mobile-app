import { Component } from '@angular/core';

/**
 * Generated class for the MesHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mes-header',
  templateUrl: 'mes-header.html'
})
export class MesHeaderComponent {

  text: string;

  constructor() {
    console.log('Hello MesHeaderComponent Component');
    this.text = 'Hello World';
  }

}
