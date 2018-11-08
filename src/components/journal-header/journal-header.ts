import { Component } from '@angular/core';
import moment from 'moment';

/**
 * Generated class for the JournalHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'journal-header',
  templateUrl: 'journal-header.html'
})
export class JournalHeaderComponent {
  text: string;

  constructor() {}

  getDate() {
    return moment(Date.now()).format('dddd, D MMMM');
  }
}
