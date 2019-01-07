import { Component, Input } from '@angular/core';
import { Name } from '../../../../common/domain/DJournal';

@Component({
  selector: 'candidate',
  templateUrl: 'candidate.html'
})
export class CandidateComponent {
  @Input()
  name: Name;

  @Input()
  testComplete: boolean;

  @Input()
  welshLanguage: boolean;

  constructor() {
  }

  ngOnInit() {
    this.testComplete = false; // not in json as yet... add when it is
  }
}
