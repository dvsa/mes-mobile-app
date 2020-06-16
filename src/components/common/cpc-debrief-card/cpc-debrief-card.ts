import { Component, Input, OnInit } from '@angular/core';
import { Question, Question5 } from '@dvsa/mes-test-schema/categories/CPC';
import { TestOutcome } from '../../../shared/models/test-outcome';

export type QuestionUnion = Question
| Question5;

export const MINIMUM_QUESTION_SCORE: number = 15;

@Component({
  selector: 'cpc-debrief-card',
  templateUrl: 'cpc-debrief-card.html',
})
export class CPCDebriefCardComponent implements OnInit {

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
  public testOutcome: string;

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
    return question.score >= MINIMUM_QUESTION_SCORE;
  }

  isPass = (): boolean => {
    return this.testOutcome === TestOutcome.PASS;
  }

  ngOnInit(): void {
    this.questions = [this.question1, this.question2, this.question3, this.question4, this.question5];
  }

}