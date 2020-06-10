import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'question-footer',
  templateUrl: 'question-footer.html',
})
export class QuestionFooterComponent {

  @Output()
  questionPageChange = new EventEmitter();

  @Output()
  testSummaryRequested = new EventEmitter<boolean>();

  @Input()
  questionNumber: number;

  showPreviousPageButton = (): boolean => this.questionNumber > 1;

  showNextPageButton = (): boolean => this.questionNumber < 5;

  showViewSummaryButton = (): boolean => this.questionNumber === 5;

  goToPreviousQuestion = (): void => {
    const questionNumber: number = this.questionNumber - 1;
    this.questionPageChange.emit(questionNumber);
  }

  goToNextQuestion = () => {
    const questionNumber: number = this.questionNumber + 1;
    this.questionPageChange.emit(questionNumber);
  }

  goToSummary = (): void => {
    this.testSummaryRequested.emit(true);
  }

}
