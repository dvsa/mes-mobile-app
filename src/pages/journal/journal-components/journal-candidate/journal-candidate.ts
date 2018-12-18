import { Component, Input } from '@angular/core';

@Component({
  selector: 'journal-candidate',
  templateUrl: 'journal-candidate.html',
  inputs: ['title', 'firstName', 'lastName','testCategory']
})
export class JournalCandidateComponent {

  @Input()
  title: string;

  @Input()
  firstName: string;

  @Input()
  lastName: string;

  @Input()
  testCategory: string;

  testCategoryDescription: string;

  constructor() {
  }

  getCategoryDescription(): string {
    if (this.testCategory === 'B57mins') {
      return 'Cat B'
    }
    return '';
  }
}
