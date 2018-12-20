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
