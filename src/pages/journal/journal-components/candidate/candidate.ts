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
  testCategory: string;

  @Input()
  testComplete: boolean;

  @Input()
  welshLanguage: boolean;

  testCategoryDescription : string
  constructor() {
  }

  ngOnInit() {
    this.testCategoryDescription = this.getCategoryDescription();
    this.testComplete = true; // not in json as yet... add when it is
  }

  getCategoryDescription(): string {
    if (this.testCategory === 'B57mins') {
      return 'Cat B'
    }
    return 'N/A';
  }
}
