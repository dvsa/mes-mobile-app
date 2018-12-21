import { Component, Input } from '@angular/core';
import { Name } from '../../../../common/domain/Journal';

@Component({
  selector: 'journal-candidate',
  templateUrl: 'journal-candidate.html',
  inputs: ['name','testCategory']
})
export class JournalCandidateComponent {
  @Input()
  name: Name;

  @Input()
  testCategory: string;

  @Input()
  testComplete: boolean;

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
