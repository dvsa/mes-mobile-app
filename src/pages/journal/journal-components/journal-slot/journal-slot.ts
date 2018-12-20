import { Component, Input } from '@angular/core';

@Component({
  selector: 'journal-slot',
  templateUrl: 'journal-slot.html',
  inputs: ['slot']
})
export class JournalSlotComponent {
  @Input()
  slot: any;
  constructor() {
  }
}
