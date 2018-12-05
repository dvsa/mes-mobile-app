import { Component } from '@angular/core';

/**
 * Generated class for the MesCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mes-card',
  templateUrl: 'mes-card.html'
})
export class MesCardComponent {

  text: string;

  constructor() {
    console.log('Hello MesCardComponent Component');
    this.text = 'Hello World';
  }

}
