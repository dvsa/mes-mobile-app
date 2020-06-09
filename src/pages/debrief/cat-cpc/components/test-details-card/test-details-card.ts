import { Component, Input, OnInit } from '@angular/core';
import { Question, Question5 } from '@dvsa/mes-test-schema/categories/CPC';

export type QuestionUnion = Question
| Question5;

@Component({
  selector: 'test-details-card',
  templateUrl: 'test-details-card.html',
})
export class TestDetailsCardComponent implements OnInit {

  @Input()
  public question1: Question;

  @Input()
  public question2: Question;

  @Input()
  public question3: Question;

  @Input()
  public question4: Question;

  @Input()
  public question5: Question5;

  @Input()
  public overallScore: number;

  @Input()
  public questions: QuestionUnion[];

  constructor() {
  }

  getFormattedQuestion = (question: Question | Question5): string => {
    return `${question.questionCode} - ${question.title}`;
  }

  getQuestionPercentage = (question: Question | Question5): number => {
    return question.score;
  }

  shouldTickBox = (question: Question | Question5): boolean => {
    return question.score > 15;
  }

  getTotalScore = (): number => {
    let count = 0;
    for (const question of this.questions) {
      count = count + this.getQuestionPercentage(question);
    }
    return count;
  }

  isPass = (): boolean => {
    let percentageRequirement: boolean = false;
    for (const question of this.questions) {
      if (question.score === 20) {
        percentageRequirement = true;
      }
      if (question.score < 15) {
        return false;
      }
    }
    if (!percentageRequirement || this.getTotalScore() < 80) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.questions = [this.question1, this.question2, this.question3, this.question4, this.question5];
  }

}
