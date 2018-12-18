import { Component, Input } from '@angular/core';

@Component({
  selector: 'journal-time',
  templateUrl: 'journal-time.html',
  inputs: ['time']
})
export class JournalTimeComponent {

  @Input()
  time: string;

  constructor() {
  }

}
